import { Link } from "react-router"
import { Button } from "../Button/Button"

import css from "./Header.module.css";

const handleClick = () => {
}

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/"><span className="">psychologists.</span>services</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/psychologists">Psychologists</Link></li>
          {/* <li><Link to="/favorites">Favorites</Link></li> */}
          <div className={css.btnContainer}>
            <Button handleClick={handleClick} variant="transparent" text="Log In" horizontalPaddings={39} />
            <Button handleClick={handleClick} variant="filled" text="Registration" horizontalPaddings={40}/>
          </div>
        </ul>
      </nav>
    </header>
  )
}
