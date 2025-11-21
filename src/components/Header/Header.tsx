import { Link, NavLink, useLocation, useNavigate } from "react-router"
import { useAuthStore } from "../../store/authStore";
import { logoutUser } from "../../firebase/authApi";
import { Container } from "../Container/Container";
import { Button } from "../Button/Button"
import css from "./Header.module.css";


export const Header = () => {

  const { user } = useAuthStore();
  
  const location = useLocation();
  const navigate = useNavigate();

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
              {user && <li className={css.navItemContainer}>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? css.active : ""}>Favorites</NavLink>
              </li>}
            </ul>
          </nav>
          <div className={css.btnContainer}>
            {user ? (
              <>
                <p className={css.userBadge}>
                  <p className={css.userAvatar}>
                    <svg width={24} height={24}  className={css.userIcon}>
                      <use href="sprite.svg#user"></use>
                    </svg>
                  </p>
                  <p className={css.userName}>{ user.displayName }</p>
                </p>
                <Button type="button" handleClick={logoutUser} variant="transparent" horizontalPaddings={39}>Log out</Button>
              </>
            ) : (
            <>
              <Button type="button" handleClick={() => handleAuthClick("login")} variant="transparent" horizontalPaddings={39}>Log In</Button>
              <Button type="button" handleClick={() => handleAuthClick("registration")} variant="filled" horizontalPaddings={40}>Registration</Button>
            </>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
