import classes from './UserRegister.module.css';
import { useState } from "react";
import bcrypt from "bcryptjs";

const UserRegister = ({ onRegister, onShowRegister }) => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [userName, setUserName] = useState("");
   const [userSurName, setUserSurName] = useState("");
   const [userDate, setUserDate] = useState("");
   const [error, setError] = useState("");

   const handleRegister = async (e) => {
      e.preventDefault();

      if (
         login.trim() === "" ||
         password.trim() === "" ||
         userName.trim() === "" ||
         userSurName.trim() === "" ||
         userDate.trim() === ""
      ) {
         setError("Пожалуйста, заполните все поля!");
         return;
      }
      if (password.length < 6) {
         setError("Пароль должен быть не менее 6 символов!");
         return;
      }
      if (password !== confirmPassword) {
         setError("Пароли не совпадают!");
         return;
      }
      setError('');

      try {
         const response = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/users.json");
         if (!response.ok) throw new Error("Ошибка при проверке пользователей!");

         const data = await response.json();
         const users = Object.values(data || {});

         const isExist = users.some(u => u.name.trim().toLowerCase() === login.trim().toLowerCase());
         if (isExist) {
            setError("Такой логин уже зарегистрирован, выберите другое имя!");
            return;
         }

         const salt = bcrypt.genSaltSync(10);
         const hashedPassword = bcrypt.hashSync(password, salt);

         const saveResponse = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/users.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               name: login,
               hashedPassword,
               userName,
               userSurName,
               userDate
            }),
         });

         if (!saveResponse.ok) throw new Error("Ошибка при сохранении пользователя!");

         setLogin('');
         setPassword('');
         setConfirmPassword('');
         setUserName('');
         setUserSurName('');
         setUserDate('');
         setError('');

         onRegister && onRegister({
            login,
            userName,
            userSurName,
            userDate,
         });

      } catch (err) {
         setError("Ошибка при регистрации!");
      }
   };

   return (
      <form onSubmit={handleRegister} className={classes.formBlock}>
         {error && <div className={classes.err}>{error}</div>}
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
            placeholder="Ваша имя"
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
            placeholder="Ваша дата рождения"
         />
         <div className={classes.btns}>
            <button type="button" onClick={onShowRegister}>Назад</button>
            <button type="submit">Зарегистрироваться</button>
         </div>
      </form>
   );
};

export default UserRegister;
