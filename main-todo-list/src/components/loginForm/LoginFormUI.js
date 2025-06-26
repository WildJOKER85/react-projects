import classes from './LoginForm.module.css';

const LoginFormUI = ({
   login,
   password,
   onChangeLogin,
   onChangePassword,
   onSubmit,
   onGoToRegister,
   isLoading,
   error
}) => {
   return (
      <form className={classes.form} onSubmit={onSubmit}>
         <div className={classes.block}>
            <div className={classes['inp-block']}>
               <label htmlFor="login">Логин</label>
               <input
                  id="login"
                  type="text"
                  value={login}
                  onChange={onChangeLogin}
               />
            </div>
            <div className={classes['inp-block']}>
               <label htmlFor="password">Пароль</label>
               <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
               />
            </div>

            {error && <div className={classes.errMessage}>{error}</div>}

            <div className={classes.btns}>
               <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Вход...' : 'Войти'}
               </button>
               <button type="button" onClick={onGoToRegister}>
                  Регистрация
               </button>
            </div>
         </div>
      </form>
   );
};

export default LoginFormUI;