import React, { useEffect } from 'react'
import css from "./Modal.module.css";
import { createPortal } from 'react-dom';

type ModalProps = {
    children: React.ReactNode,
    onClose: () => void,
    title?: string,
    mainText?: string,
    contentWidth?: number
}


export const Modal = ({ children, onClose, title, mainText, contentWidth }: ModalProps) => {

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", onEscape);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onEscape);
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);
    
    return createPortal(
        <div className={css.backdrop} onClick={handleBackdrop}>
            <div className={css.modal}>
                <div className={css.modalWrapper} style={{ width: contentWidth }}>
                    <div>
                        <svg width={32} height={32} className={css.iconClose} onClick={onClose}>
                            <use href="sprite.svg#close"></use>
                        </svg>
                        <h2 className={css.modalTitle}>{title}</h2>
                        <p className={css.modalText}>{mainText}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
