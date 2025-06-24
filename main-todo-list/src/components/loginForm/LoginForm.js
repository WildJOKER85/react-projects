import classes from './LoginForm.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/auth-slice';

const LoginForm = ({ onShowRegister }) => {
   const dispatch = useDispatch();
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const { error, isLoading } = useSelector(state => state.auth);

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ login, password }));
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
            {error && <div className={classes.errMessage}>{error}</div>}
            <div className={classes.btns}>
               <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Вход...' : 'Войти'}
               </button>
               <button type="button" onClick={() => {
                  onShowRegister(); dispatch(clearError())
               }}>
                  Регистрация
               </button>
            </div>
         </div>
      </form>
   );
};

export default LoginForm;

