import { Link, NavLink } from "react-router"
import { Button } from "../Button/Button"

import css from "./Header.module.css";
import { Container } from "../Container/Container";

const handleClick = () => {
}

export const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContainer}>
          <nav className={css.navigation}>
            <ul className={css.navList}>
              <li className={css.logo}>
                <Link to="/"><span className={css.accent}>psychologists.</span >services</Link>
              </li>
              <li className={css.navItemContainer}>
                <NavLink to="/" className={({ isActive }) => isActive ? css.active : ""}>Home</NavLink>
              </li>
              <li className={css.navItemContainer}>
                <NavLink to="/psychologists" className={({ isActive }) => isActive ? css.active : ""}>Psychologists</NavLink>
              </li>
              <li className={css.navItemContainer}>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? css.active : ""}>Favorites</NavLink>
              </li>
            </ul>
          </nav>
          <div className={css.btnContainer}>
            <Button handleClick={handleClick} variant="transparent" horizontalPaddings={39}>Log In</Button> 
            <Button handleClick={handleClick} variant="filled" horizontalPaddings={40}>Registration</Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
