import classes from './UserRegister.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/auth-slice';

const UserRegister = ({ onShowRegister }) => {
   const dispatch = useDispatch();
   const { error, isLoading, registered } = useSelector(state => state.auth);

   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [userName, setUserName] = useState("");
   const [userSurName, setUserSurName] = useState("");
   const [userDate, setUserDate] = useState("");
   const [localError, setLocalError] = useState("");

   const handleRegister = async (e) => {
      e.preventDefault();

      if (!login || !password || !confirmPassword || !userName || !userSurName || !userDate) {
         setLocalError("Пожалуйста, заполните все поля!");
         return;
      }

      if (password.length < 6) {
         setLocalError("Пароль должен быть не менее 6 символов!");
         return;
      }

      if (password !== confirmPassword) {
         setLocalError("Пароли не совпадают!");
         return;
      }

      setLocalError("");
      dispatch(registerUser({ login, password, userName, userSurName, userDate }));
   };

   // Если успешно зарегистрирован — возвращаемся к логину
   useEffect(() => {
      if (registered) {
         onShowRegister(); // вернуться к логину
      }
   }, [registered, onShowRegister]);

   return (
      <form onSubmit={handleRegister} className={classes.formBlock}>
         {(error || localError) && (
            <div className={classes.err}>{error || localError}</div>
         )}
         <input
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
            placeholder="Придумайте логин"
         />
         <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Придумайте пароль"
         />
         <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите пароль еще раз"
         />
         <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="Ваше имя"
         />
         <input
            type="text"
            value={userSurName}
            onChange={e => setUserSurName(e.target.value)}
            placeholder="Ваша фамилия"
         />
         <input
            type="date"
            value={userDate}
            onChange={e => setUserDate(e.target.value)}
         />
         <div className={classes.btns}>
            <button type="button" onClick={onShowRegister}>Назад</button>
            <button type="submit" disabled={isLoading}>
               {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
            </button>
         </div>
      </form>
   );
};

export default UserRegister;

