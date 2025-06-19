import classes from './Header.module.css';

const Header = ({ user }) => {
   return (
      <header className={classes.header}>
         <h1>Todo List</h1>
         <h2>
            Привет, {user.userName} {user.userSurName}!
         </h2>
         <button>Выйти</button>
      </header>
   );
};

export default Header;
