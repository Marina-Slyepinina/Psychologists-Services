import { useEffect, useRef, useState } from "react";
import type { PriceFilter, SortDirection, SortField } from "../../firebase/dataApi";
import { usePsychologistsStore, type CurrentFilterSettings } from "../../store/psychologistsStore";
import css from "./FilterDropdown.module.css";

export interface FilterOption {
  value: SortField | PriceFilter;
  label: string;
  type: 'sort' | 'filter';
  direction?: SortDirection;
}

const filterOptions: FilterOption[] = [

  { label: 'A to Z', value: 'name', type: 'sort', direction: 'asc' },
  { label: 'Z to A', value: 'name', type: 'sort', direction: 'desc' },
  
  { label: 'Less than 10$', value: 'less_than_10', type: 'filter' },
  { label: 'Greater than 10$', value: 'greater_than_10', type: 'filter' },

  { label: 'Popular', value: 'rating', type: 'sort', direction: 'desc' },
  { label: 'Not popular', value: 'rating', type: 'sort', direction: 'asc' },
  
  { label: 'Show all', value: 'all', type: 'filter' }

];

export const FilterDropdown = () => {
  const { currentSettings, applyFilter } = usePsychologistsStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const optionsToDisplay = filterOptions.map(opt => {
    let settings: CurrentFilterSettings;

    if (opt.type === 'sort') {
      settings = {
        sortField: opt.value as SortField,
        sortDirection: opt.direction as SortDirection,
        priceFilter: 'all' as PriceFilter,
      };
    } else {
      settings = {
        sortField: 'price_per_hour' as SortField,
        sortDirection: 'asc' as SortDirection,
        priceFilter: opt.value as PriceFilter,
      };
    }

    return {
      label: opt.label,
      settings: settings,
    };
  });

  const activeOption = filterOptions.find(opt => {

    if (opt.type === 'filter' && opt.value === currentSettings.priceFilter) {
      return true;
    }

    if (opt.type === 'sort' && opt.direction) {
      return currentSettings.priceFilter === 'all' &&
        opt.value === currentSettings.sortField &&
        opt.direction === currentSettings.sortDirection;
    }

    return false;
  }) || filterOptions.find(opt => opt.value === 'all') || filterOptions[0];

  const handleSelect = (option: typeof optionsToDisplay[0]) => {
    setIsOpen(false);
    applyFilter(option.settings);
  };

  const isOptionActive = (option: typeof optionsToDisplay[0]): boolean => {
    const { sortField, sortDirection, priceFilter } = option.settings;

    if (priceFilter !== 'all') {
      return priceFilter === currentSettings.priceFilter;
    }

    if (currentSettings.priceFilter === 'all') {
      return sortField === currentSettings.sortField && sortDirection === currentSettings.sortDirection;
    }

    return false;
  };

  return (
    <div className={css.dropdownContainer} ref={dropdownRef}>
      <p className={css.subtitle}>Filters</p>

      <div
        className={css.dropdownHeader}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        <span>{activeOption.label}</span>
        <svg width={20} height={20}
          className={`${css.arrowIcon} ${isOpen ? css.open : ''}`}
        >
          <use href="sprite.svg#chevron-down"></use>
        </svg>
      </div>

      <ul className={`${css.optionsList} ${isOpen ? css.open : ''}`}>
        {optionsToDisplay.map((option, index) => {
          const isActive = isOptionActive(option);

          return (
            <li
              key={index}
              className={`${css.optionItem} ${!isActive ? css.inactive : css.active}`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={isActive}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};