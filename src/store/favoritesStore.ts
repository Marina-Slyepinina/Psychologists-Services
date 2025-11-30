import { create } from "zustand";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { app, db } from "../firebase/config";

const projectId = app.options.projectId;

interface FavoritesState {
  favoriteIds: Set<string>;
  isLoaded: boolean;
  isLoading: boolean;
  currentUnsubscribe: Unsubscribe | null;

  setLoading: (loading: boolean) => void;
  setFavoriteIds: (ids: string[]) => void;
  toggleFavoriteLocal: (id: string, isAdding: boolean) => void;

  startFavoritesListener: (userId: string) => void;
  stopFavoritesListener: () => void;
  toggleFavorite: (
    userId: string,
    psychologistId: string,
    isAdding: boolean
  ) => Promise<void>;
}

const getFavoritesCollectionPath = (userId: string) =>
  `artifacts/${projectId}/users/${userId}/favorites`;

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: new Set(),
  isLoaded: false,
  isLoading: false,
  currentUnsubscribe: null,

  setLoading: loading => set({ isLoading: loading }),

  setFavoriteIds: ids => {
    set({ favoriteIds: new Set(ids), isLoaded: true, isLoading: false });
  },

  toggleFavoriteLocal: (id, isAdding) =>
    set(state => {
      const newSet = new Set(state.favoriteIds);

      if (isAdding) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }

      return { favoriteIds: newSet };
    }),

  startFavoritesListener: userId => {
    const { currentUnsubscribe, stopFavoritesListener } = get();

    if (currentUnsubscribe) {
      stopFavoritesListener();
    }

    set({ isLoading: true, favoriteIds: new Set() });

    try {
      const favoritesRef = collection(db, getFavoritesCollectionPath(userId));

      const unsubscribe = onSnapshot(
        favoritesRef,
        snapshot => {
          const ids = snapshot.docs.map(doc => doc.id);
          get().setFavoriteIds(ids);
        },
        error => {
          console.error(
            "[FavoritesStore] Error in onSnapshot listener:",
            error
          );
          set({ isLoading: false, isLoaded: true });
        }
      );

      set({ currentUnsubscribe: unsubscribe });
      console.log(
        `[FavoritesStore] Real-time listener started for User: ${userId}`
      );
    } catch (error) {
      console.error("[FavoritesStore] Failed to start listener:", error);
      set({ isLoading: false, isLoaded: true });
    }
  },

  stopFavoritesListener: () => {
    const { currentUnsubscribe } = get();
    if (currentUnsubscribe) {
      currentUnsubscribe();
      console.log("[FavoritesStore] Listener stopped.");
    }
    set({ currentUnsubscribe: null, favoriteIds: new Set(), isLoaded: false });
  },

  toggleFavorite: async (userId, psychologistId, isAdding) => {
    if (!userId || !db) {
      throw new Error(
        "User is not authenticated or Firebase DB is not initialized."
      );
    }

    get().toggleFavoriteLocal(psychologistId, isAdding);

    try {
      const favoriteDocRef = doc(
        db,
        getFavoritesCollectionPath(userId),
        psychologistId
      );

      if (isAdding) {
        await setDoc(favoriteDocRef, { addedAt: new Date().toISOString() });
      } else {
        await deleteDoc(favoriteDocRef);
      }
    } catch (error) {
      console.error(
        `[FavoritesStore] Error toggling favorite for ${psychologistId}:`,
        error
      );
      get().toggleFavoriteLocal(psychologistId, !isAdding);
      throw new Error("Не вдалося оновити список обраних. Спробуйте пізніше.");
    }
  },
}));