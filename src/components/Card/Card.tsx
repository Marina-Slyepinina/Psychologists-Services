import { useState } from "react";
import { Button } from "../Button/Button";
import type { Psychologist } from "../../firebase/dataApi";
import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { Modal } from "../Modal/Modal";
import { MakeAppointmentModal } from "../MakeAppointmentModal/makeAppointmentModal";
import css from "./Card.module.css";

type CardProps = {
    psychologist: Psychologist;
}

export const Card = ({ psychologist }: CardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const psychologistId = psychologist.id; 

    const favoriteIds = useFavoritesStore(state => state.favoriteIds);
    const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
    const userId = useAuthStore(state => state.user?.uid);

    const isFavorite = favoriteIds.has(psychologistId);

    const handleToggleFavorite = async () => {

        if (!userId) {
            setIsAuthModalOpen(true);
            return;
        }

        try {
            await toggleFavorite(userId, psychologistId, !isFavorite);
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
        }
    };

    return (
        <>
            <div className={css.card}>
                <div className={css.avatarWrapper}>
                    <img src={psychologist.avatar_url} alt="Avatar" className={css.avatarImg}/>
                </div>
                <div className={css.cardContent}>
                    <div className={css.cardHeader}>
                        <div className={css.cardTitleWrapper}>
                            <div className={css.specialty}>Psychologist</div>
                            <div className={css.name}>{psychologist.name}</div>
                        </div>
                        <div className={css.cardRatingAndPriceWrapper}>
                            <div className={css.cardRatingAndPrice}>
                                <div className={css.cardRating}>
                                    <svg width={16} height={16} className={css.star}>
                                        <use href="sprite.svg#star"></use>
                                    </svg>
                                    <p>Rating: {psychologist.rating}</p>
                                </div>
                                <div className={css.decorLine}></div>
                                <div className={css.cardPrice}>
                                    Price / 1 hour: <span className={css.accent}>{psychologist.price_per_hour}$</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`${css.heartButton} ${isFavorite ? css.isFavorite : ''}`}
                                onClick={handleToggleFavorite}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <svg width={26} height={26} className={css.heart}>
                                    <use href="sprite.svg#heart"></use>
                                </svg>
                            </button>
                        </div>
            
                    </div>
            
                    <div className={css.cardMainInfo}>
                        <div className={css.characteristicsList}>
                            <div className={css.characteristic}>Experience: <span className={css.characteristicValue}>{psychologist.experience}</span></div>
                            <div className={css.characteristic}>License: <span className={css.characteristicValue}>{psychologist.license}</span></div>
                            <div className={css.characteristic}>Specialization: <span className={css.characteristicValue}>{psychologist.specialization}</span></div>
                            <div className={css.characteristic}>Initial_consultation: <span className={css.characteristicValue}>{psychologist.initial_consultation}</span></div>
                        </div>
                        <div className={css.description}>{psychologist.about}</div>
                    </div>
                    { !isOpen ? (
                            <button type="button" className={css.readMore} onClick={() => setIsOpen(!isOpen)}>Read more</button>
                        ) : (
                            <>
                                <div className={css.reviewsList}>
                                    {psychologist.reviews.map(item => (
                                        <div className={css.reviewsListItem}>
                                            <div className={css.reviewHeader}>
                                                <div className={css.reviewerAvatar}>{item.reviewer.slice(0, 1).toLocaleUpperCase()}</div>
                                                <div className={css.reviewerInfo}>
                                                    <div className={css.reviewerName}>{item.reviewer}</div>
                                                    <div className={css.reviewerRating}>
                                                        <svg width={16} height={16} className={css.star}>
                                                            <use href="sprite.svg#star"></use>
                                                        </svg>
                                                        <p>{item.rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={css.reviewText}>{item.comment}</div>
                                        </div>
                                    ))}
                                </div>
                                <Button type="button" variant="filled" horizontalPaddings={32} handleClick={() => setIsAppointmentModalOpen(true)}>Make an appointment</Button>
                            </>
                        )
                    }
                </div>
            </div>
            {isAuthModalOpen && (
                <Modal
                    title="Authentication required"
                    onClose={() => setIsAuthModalOpen(false)}
                >
                    <p>To add psychologists to your preferred list, please log in or register.</p>
                    <div>
                        <Button type="button" variant="filled" handleClick={() => setIsAuthModalOpen(false)}>Close</Button>
                    </div>
                </Modal>
            )}
            {isAppointmentModalOpen && (
                <MakeAppointmentModal onClose={() => setIsAppointmentModalOpen(false)} psychologist={psychologist} />
            )}
        </>
    )
}