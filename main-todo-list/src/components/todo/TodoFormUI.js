import classes from './TodoForm.module.css';
import Header from '../header/Header';
import TodoCardUI from './TodoCardUI';

const TodoFormUI = ({
   user,
   todos,
   error,
   loading,
   inputValue,
   areaValue,
   onInputChange,
   onAreaChange,
   onSubmit,
   onDelete,
   onEdit,
   onLogOut
}) => {

   return (
      <>
         <Header user={user} onLogOut={onLogOut} />
         {error && <div className={classes.error}>{error}</div>}

         <form className={classes.main} onSubmit={onSubmit}>
            <div className={classes.formCard}>
               <div className={classes.fieldGroup}>
                  <label htmlFor="name">Заметка</label>
                  <input
                     type="text"
                     id="name"
                     value={inputValue}
                     onChange={e => onInputChange(e.target.value)}
                     placeholder="Введите заголовок"
                  />
               </div>
               <textarea
                  className={classes.textarea}
                  value={areaValue}
                  onChange={e => onAreaChange(e.target.value)}
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
               <TodoCardUI
                  key={todo.id}
                  todo={todo}
                  onDelete={() => onDelete(todo.id)}
                  onEdit={() => onEdit(todo.id)}
               />
            ))
         )}
      </>
   );
};

export default TodoFormUI;