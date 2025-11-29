import { create } from "zustand";
import { fetchPsychologists, type PriceFilter, type Psychologist, type SortDirection, type SortField } from "../firebase/dataApi";

export type CurrentFilterSettings = {
  sortField: SortField;
  sortDirection: SortDirection;
  priceFilter: PriceFilter;
};

type PsychologistsStore = {
  psychologists: Psychologist[];
  hasMore: boolean;
  isLoading: boolean;

  currentSettings: CurrentFilterSettings;

  loadInitialData: () => void;
  loadMore: () => void;
  applyFilter: (newSettings: CurrentFilterSettings) => void;
};

export const usePsychologistsStore = create<PsychologistsStore>((set, get) => ({

  psychologists: [],
  hasMore: true,
  isLoading: false,
  currentSettings: {
    sortField: "rating",
    sortDirection: "desc",
    priceFilter: "all",
  },

  loadInitialData: async () => {
    const { currentSettings } = get();

    set({ isLoading: true });

    try {
      const result = await fetchPsychologists(
        true,
        currentSettings.sortField,
        currentSettings.sortDirection,
        currentSettings.priceFilter
      );

      set({
        psychologists: result.data,
        hasMore: result.hasMore,
        isLoading: false,
      });
    } catch (error) {
      console.error("Помилка при завантаженні початкових даних:", error);
      set({ isLoading: false, hasMore: false });
    }
  },

  loadMore: async () => {
    const { hasMore, isLoading, currentSettings, psychologists } = get();

    if (!hasMore || isLoading) return;

    set({ isLoading: true });

    try {
      const result = await fetchPsychologists(
        false,
        currentSettings.sortField,
        currentSettings.sortDirection,
        currentSettings.priceFilter
      );

      set({
        psychologists: [...psychologists, ...result.data],
        hasMore: result.hasMore,
        isLoading: false,
      });
    } catch (error) {
      console.error("Помилка при завантаженні наступної порції даних:", error);
      set({ isLoading: false });
    }
  },

  applyFilter: async (newSettings: CurrentFilterSettings) => {
    set({ currentSettings: newSettings, psychologists: [], hasMore: false });
    
    get().loadInitialData();
  },
}));
