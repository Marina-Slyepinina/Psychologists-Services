import { useEffect } from "react";
import { usePsychologistsStore } from "../store/psychologistsStore";
import { Container } from "../components/Container/Container";
import { FilterDropdown } from "../components/FilterDropdown/FilterDropdown";
import { Card } from "../components/Card/Card";
import { Button } from "../components/Button/Button";
import css from "./Psychologists.module.css";

export const Psychologists = () => {

  const {
    psychologists,
    isLoading,
    hasMore,
    loadInitialData,
    loadMore
  } = usePsychologistsStore();

  const currentSettings = usePsychologistsStore(state => state.currentSettings);

  useEffect(() => {
    if (psychologists.length === 0 && !isLoading) {
      loadInitialData();
    }
  }, [currentSettings, loadInitialData, isLoading, psychologists.length]);


  const showLoadMoreButton = hasMore && !isLoading && psychologists.length > 0;
  const showLoadingOnInitial = isLoading && psychologists.length === 0;

  return (
    <section className={css.psychologistsPage}>
      <Container className={css.container}>

        <div className={css.filterDropdown}>
          <FilterDropdown />
        </div>

        {!showLoadingOnInitial && psychologists.length > 0 && (
          <div className={css.psychologistList}>
            {psychologists.map((psychologist) => (
              <Card key={psychologist.id} psychologist={psychologist} />
            ))}
          </div>
        )}

        {showLoadMoreButton && (
          <div className={css.btnWrapper}>
            <Button
              type="button"
              variant="filled"
              handleClick={loadMore}
            >
              Load more
            </Button>
          </div>
        )}

      </Container>
    </section>
  );
};