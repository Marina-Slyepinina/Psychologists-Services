// import css from "./Header.module.css";

import { Link } from "react-router"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">psychologists.services</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/psychologists">Psychologists</Link></li>
          {/* <li><Link to="/favorites">Favorites</Link></li> */}
        </ul>
      </nav>
    </header>
  )
}
