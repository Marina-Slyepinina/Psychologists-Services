import { Link, NavLink, useLocation, useNavigate } from "react-router"
import { Container } from "../Container/Container";
import { Button } from "../Button/Button"

import css from "./Header.module.css";


export const Header = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  // const backgroundLocation = location.state?.backgroundLocation;
  // console.log("backgroundLocation ", backgroundLocation);
  // console.log("location ", location);
  // console.log("location.pathname ", location.pathname);

  const handleAuthClick = (path: string) => {
    navigate(path, {
      state: { backgroundLocation: location }
    })
  }

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
            <Button type="button" handleClick={() => handleAuthClick("login")} variant="transparent" horizontalPaddings={39}>Log In</Button> 
            <Button type="button" handleClick={() => handleAuthClick("registration")} variant="filled" horizontalPaddings={40}>Registration</Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
