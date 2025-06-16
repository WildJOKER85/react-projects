import classes from './Header.module.css';
import TodoForm from '../todoForm/TodoForm';
import TodoCard from '../todoForm/TodoCard';
import { useState } from 'react';

const Header = (props) => {
   const [user, setUser] = useState([]);

   const logOut = () => {
      props.logOut();
   }

   return (
      <>
         <header>
            <h1>Todo List</h1>
            <button onClick={logOut}>На главную</button>
         </header>
         <TodoForm />
      </>
   );
};

export default Header;
