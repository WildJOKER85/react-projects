import classes from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { userAuthActions } from "../store/user-auth-slice";

const Auth = () => {
   const dispatchFunction = useDispatch();

   const logInHandler = (e) => {
      e.preventDefault();
      dispatchFunction(userAuthActions.logIn());
   };

   return (
      <main className={classes.auth}>
         <section>
            <form onSubmit={logInHandler}>
               <div className={classes.control}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
               </div>
               <div className={classes.control}>
                  <label htmlFor="password">Пароль</label>
                  <input type="password" id="password" />
               </div>
               <button>Войти</button>
            </form>
         </section>
      </main>
   );
};

export default Auth;