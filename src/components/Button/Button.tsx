import css from "./Button.module.css";

type ButtonVariant = "transparent" | "filled";

type horizontalPaddingsVariants = 32 | 39 | 40 | 48 | 50;

type BtnProps = {
    type: "button" | "submit" | "reset"
    children: React.ReactNode;
    variant: ButtonVariant;
    handleClick?: () => void;
    isFullWidth?: boolean;
    horizontalPaddings?: horizontalPaddingsVariants;
}

export const Button = ({ type, handleClick, children, variant, isFullWidth, horizontalPaddings }: BtnProps) => {
    
    const fullWidthClass = isFullWidth ? css.fullWidth : '';

    return (
        <button onClick={handleClick} type={type} className={`${css.base} ${css[variant]} ${fullWidthClass} ${css[`horizontalPaddings-${horizontalPaddings}`]}`}>{children}</button>
    )
}
