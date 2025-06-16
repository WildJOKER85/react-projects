import classes from './TodoForm.module.css';
import { useState } from 'react';

const TodoForm = ({ onAddUser }) => {
   const [inputValue, setInputValue] = useState('');

   const inputValueHandler = (e) => {
      setInputValue(e.target.value);
   };

   const submitHandler = (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
      onAddUser({ name: inputValue });
      setInputValue('');
   };

   return (
      <form className={classes.main} onSubmit={submitHandler}>
         <div className={classes.content}>
            <div className={classes.itemInput}>
               <label htmlFor='name'>Имя</label>
               <input
                  type='text'
                  id='name'
                  onChange={inputValueHandler}
                  value={inputValue}
               />
            </div>
            <div className={classes.areaBlock}>
               <textarea />
            </div>
            <div className={classes.btn}>
               <button type="submit">Добавить</button>
            </div>
         </div>
      </form>
   );
};

export default TodoForm;

