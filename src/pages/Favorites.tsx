import { useState, useEffect, useMemo } from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import { usePsychologistsStore } from "../store/psychologistsStore";
import { fetchPsychologistsByIds, type Psychologist } from "../firebase/dataApi";
import { Container } from "../components/Container/Container";
import { Card } from "../components/Card/Card";
import { FilterDropdown } from "../components/FilterDropdown/FilterDropdown";
import { Button } from "../components/Button/Button";
import css from "./Favorites.module.css";

const ITEMS_PER_PAGE = 3;

export const Favorites = () => {

  const favoriteIds = useFavoritesStore(state => state.favoriteIds);
  const favoriteIdsArray = useMemo(() => Array.from(favoriteIds), [favoriteIds]);

  const [favoritesData, setFavoritesData] = useState<Psychologist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentSettings = usePsychologistsStore(state => state.currentSettings);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      if (favoriteIdsArray.length === 0) {
        setFavoritesData([]);
        setIsLoading(false);
        return;
      }

      const data = await fetchPsychologistsByIds(favoriteIdsArray);
      setFavoritesData(data);
      setIsLoading(false);
    };

    loadFavorites();
  }, [favoriteIdsArray]);

  const filteredAndSortedFavorites = useMemo(() => {
    let processed = [...favoritesData];

    if (currentSettings.priceFilter === 'less_than_10') {
      processed = processed.filter(p => p.price_per_hour <= 10);
    } else if (currentSettings.priceFilter === 'greater_than_10') {
      processed = processed.filter(p => p.price_per_hour > 10);
    }

    processed.sort((a, b) => {
      const field = currentSettings.sortField;
      const direction = currentSettings.sortDirection;

      const valueA = a[field];
      const valueB = b[field];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (direction === 'asc') {
        return (valueA as number) - (valueB as number);
      } else {
        return (valueB as number) - (valueA as number);
      }
    });

    return processed;
  }, [favoritesData, currentSettings]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [currentSettings]);

  const visibleFavorites = filteredAndSortedFavorites.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedFavorites.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  if (isLoading) {
    return (
      <div className={css.container}>
        <p className={css.message}>Завантаження обраних...</p>
      </div>
    );
  }

  return (
    <section className={css.favoritesPage}>
      <Container>

        <div className={css.filterDropdown}>
          <FilterDropdown />
        </div>

        {favoritesData.length === 0 ? (
          <div className={css.container}>
            <p className={css.message}>Ваш список обраних порожній.</p>
          </div>
        ) : filteredAndSortedFavorites.length === 0 ? (
          <div className={css.container}>
            <p className={css.message}>За обраними критеріями нікого не знайдено.</p>
          </div>
        ) : (
              <>
                <ul className={css.psychologistList}>
                  {visibleFavorites.map(psychologist => (
                    <li key={psychologist.id}>
                      <Card psychologist={psychologist} />
                    </li>
                  ))}
                </ul>

                {hasMore && (
                  <div className={css.btnWrapper}>
                    <Button
                      type="button"
                      variant="filled"
                      handleClick={handleLoadMore}
                    >
                      Load more
                    </Button>
                  </div>
                )}
              </>
        )}
      </Container>
    </section>
  );
};