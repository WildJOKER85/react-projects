import classes from './LoginForm.module.css';
import { useState } from "react";
import bcrypt from "bcryptjs";

const LoginForm = ({ onShowRegister, onLogin }) => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/users.json");
         if (!response.ok) {
            throw new Error("Ошибка при получении данных!");
         }

         const data = await response.json();
         let foundUser = null;
         let foundKey = null;

         for (const [key, user] of Object.entries(data || {})) {
            if (
               user.name &&
               user.hashedPassword &&
               user.name.trim().toLowerCase() === login.trim().toLowerCase() &&
               bcrypt.compareSync(password, user.hashedPassword)
            ) {
               foundUser = user;
               foundKey = key;
               break;
            }
         }

         localStorage.setItem('login', foundKey);

         if (foundUser) {
            setError("");
            onLogin && onLogin({ ...foundUser, key: foundKey });
         } else {
            setError("Неверный логин или пароль!");
         }
      } catch (err) {
         setError("Ошибка при входе!");
      }
   };

   return (
      <form className={classes.form} onSubmit={handleSubmit}>
         <div className={classes.block}>
            <div className={classes['inp-block']}>
               <label htmlFor="login">Логин</label>
               <input
                  id="login"
                  type="text"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
               />
            </div>
            <div className={classes['inp-block']}>
               <label htmlFor="password">Пароль</label>
               <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
            {error && (
               <div className={classes.errMessage}>
                  {error}
               </div>
            )}
            <div className={classes.btns}>
               <button type="submit">Войти</button>
               <button type="button" onClick={onShowRegister}>Регистрация</button>
            </div>
         </div>
      </form>
   );
};

export default LoginForm;
