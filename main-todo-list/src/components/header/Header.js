import classes from './Header.module.css';

const Header = ({ user, onLogOut }) => {

   return (
      <header className={classes.header}>
         <div className={classes.left}>
            <h1 className={classes.logo}>📋 Todo List</h1>
         </div>

         <div className={classes.center}>
            <h2 className={classes.greeting}>
               Привет, {user.userName} {user.userSurName}
            </h2>
         </div>

         <div className={classes.right}>
            <button className={classes.logoutBtn} onClick={onLogOut}>
               Выйти
            </button>
         </div>
      </header>
   );
};

export default Header;



