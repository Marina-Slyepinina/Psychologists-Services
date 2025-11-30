import { useTheme } from "../context/ThemeContext.tsx";
import css from "./ThemeSwitcher.module.css";


const colors = [
    { name: 'green', hex: '#54be96' },
    { name: 'blue', hex: '#3470ff' },
    { name: 'orange', hex: '#fc832c' }
];

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    const activeColorObj = colors.find(c => c.name === theme) || colors[0];

    const dropdownColors = colors.filter(c => c.name !== theme);

    return (
        <div className={css.wrapper}>
            <p className={css.title}>Theme</p>
            <div className={css.themeSwitcher}>
                <div
                    className={css.themeCircle}
                    style={{ backgroundColor: activeColorObj.hex }}
                />
                <div className={css.themeDropdown}>
                    {dropdownColors.map((color) => (
                        <div
                            key={color.name}
                            className={css.themeCircle}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => setTheme(color.name)}
                            title={`Switch to ${color.name}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;