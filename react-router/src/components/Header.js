import classes from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = () => {
   return (
      <header className={classes.header}>
         <ul>
            <li>
               <NavLink activeClassName={classes.active} to="/home">Home</NavLink>
            </li>
            <li>
               <NavLink activeClassName={classes.active} to="/articles">Articles</NavLink>
            </li>
            <li>
               <NavLink activeClassName={classes.active} to="/about">About</NavLink>
            </li>
         </ul>
      </header>
   );
};

export default Header;
