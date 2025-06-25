import classes from './TodoForm.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from '../../store/todo-slice';
// import moment from 'moment';
import 'moment/locale/ru';
import Header from '../header/Header';
import TodoCard from './TodoCard';

const TodoForm = ({ user, onLogOut, onEditTodo }) => {
   const [inputValue, setInputValue] = useState('');
   const [areaValue, setAreaValue] = useState('');

   const dispatch = useDispatch();
   const { items: todos, loading, error } = useSelector(state => state.todo);

   const handleDelete = (id) => {
      dispatch(deleteTodo({ id, userId: user.key }));
   };

   const submitHandler = (e) => {
      e.preventDefault();
      if (!inputValue.trim() && !areaValue.trim()) return;

      const now = Date.now();
      dispatch(addTodo({
         userId: user.key,
         todo: {
            name: inputValue,
            description: areaValue,
            userId: user.key,
            createTime: now,
            updateTime: now
         }
      }));

      setInputValue('');
      setAreaValue('');
   };

   // const formatTime = (timestamp) => {
   //    moment.locale('ru');
   //    return moment(timestamp).fromNow();
   // };

   return (
      <>
         <Header user={user} onLogOut={onLogOut} />
         {error && <div className={classes.error}>{error}</div>}

         <form className={classes.main} onSubmit={submitHandler}>
            <div className={classes.formCard}>
               <div className={classes.fieldGroup}>
                  <label htmlFor='name'>Заметка</label>
                  <input
                     type='text'
                     id='name'
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder="Введите заголовок"
                  />
               </div>
               <textarea
                  className={classes.textarea}
                  value={areaValue}
                  onChange={(e) => setAreaValue(e.target.value)}
                  placeholder="Описание"
               />
               <button type="submit" className={classes.submitBtn}>Добавить</button>
            </div>
         </form>

         {loading ? (
            <div className={classes.zero}>Загрузка задач...</div>
         ) : !todos || todos.length === 0 ? (
            <div className={classes.zero}>Пока нет ни одной Todos</div>
         ) : (
            todos.map(todo => (
               <TodoCard
                  key={todo.id}
                  todo={todo}
                  onMore={() => onEditTodo(todo.id)}
                  onDelete={() => handleDelete(todo.id)}
               />
            ))
         )}
      </>
   );
};

export default TodoForm;