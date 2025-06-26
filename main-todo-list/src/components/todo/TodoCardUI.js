import classes from './TodoCard.module.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import moment from 'moment';

const MAX_LENGTH = 60;

const TodoCardUI = ({ todo, onDelete, onEdit }) => {
   moment.locale('ru');
   const formattedTime = moment(todo.updateTime).format('LLL');

   const shortDesc = todo.description?.length > MAX_LENGTH
      ? todo.description.slice(0, MAX_LENGTH) + "..."
      : todo.description || "";

   return (
      <div className={classes.card}>
         <div className={classes.header}>
            <div className={classes.name}>{todo.name}</div>
            <button className={classes.deleteBtn} onClick={onDelete}>
               <FaTrashAlt />
            </button>
         </div>

         <div className={classes.desc}>
            {shortDesc || <em>Нет описания</em>}
         </div>

         <div className={classes.footer}>
            <span className={classes.time}>
               {formattedTime}
               <span className={classes.timeIcon}>🕓</span>
            </span>
            <button className={classes.editBtn} onClick={onEdit} title="Редактировать">
               <FaEdit />
            </button>
         </div>
      </div>
   );
};

export default TodoCardUI;
