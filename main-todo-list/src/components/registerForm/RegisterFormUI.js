import classes from './RegisterForm.module.css';

const RegisterFormUI = ({
   login, password, confirmPassword, userName, userSurName, userDate,
   onChangeLogin, onChangePassword, onChangeConfirmPassword,
   onChangeUserName, onChangeUserSurName, onChangeUserDate,
   onSubmit, onBack, error, isLoading
}) => {

   return (
      <form onSubmit={onSubmit} className={classes.formBlock}>
         {error && <div className={classes.err}>{error}</div>}

         <input
            type="text"
            value={login}
            onChange={onChangeLogin}
            placeholder="Придумайте логин"
         />
         <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Придумайте пароль"
         />
         <input
            type="password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="Подтвердите пароль"
         />
         <input
            type="text"
            value={userName}
            onChange={onChangeUserName}
            placeholder="Ваше имя"
         />
         <input
            type="text"
            value={userSurName}
            onChange={onChangeUserSurName}
            placeholder="Ваша фамилия"
         />
         <input
            type="date"
            value={userDate}
            onChange={onChangeUserDate}
         />

         <div className={classes.btns}>
            <button type="button" onClick={onBack}>Назад</button>
            <button type="submit" disabled={isLoading}>
               {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
            </button>
         </div>
      </form>
   );
};

export default RegisterFormUI;
