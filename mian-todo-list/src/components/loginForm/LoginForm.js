import classes from './LoginForm.module.css';

const LoginForm = (props) => {

   const logInHandler = (e) => {
      e.preventDefault();

      props.onLogin();
   };

   return (
      <form className={classes.form} onSubmit={logInHandler}>
         <div className={classes.block}>
            <div className={classes['inp-block']}>
               <label htmlFor='name'>Введите логин</label>
               <input type='text' id='name' />
            </div>
            <div className={classes['inp-block']}>
               <label htmlFor='pwd'>Введите Пароль</label>
               <input type='password' id='pwd' />
            </div>
            <div className={classes['inp-block']}>
               <label htmlFor='date'>Дата Рождения</label>
               <input type='date' id='date' />
            </div>
            <button className={classes.btn}>Войти</button>
         </div>
      </form>
   );
};

export default LoginForm;
