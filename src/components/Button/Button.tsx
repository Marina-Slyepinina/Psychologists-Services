import css from "./Button.module.css";

type ButtonVariant = "transparent" | "filled";

type horizontalPaddingsVariants = 32 | 39 | 40 | 48 | 50;

type BtnProps = {
    children: React.ReactNode;
    handleClick: () => void;
    variant: ButtonVariant;
    isFullWidth?: boolean;
    horizontalPaddings?: horizontalPaddingsVariants;
}

export const Button = ({ handleClick, children, variant, isFullWidth, horizontalPaddings }: BtnProps) => {
    
    const fullWidthClass = isFullWidth ? css.fullWidth : '';

    return (
        <button onClick={handleClick} className={`${css.base} ${css[variant]} ${fullWidthClass} ${css[`horizontalPaddings-${horizontalPaddings}`]}`}>{children}</button>
    )
}
