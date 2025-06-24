import classes from './TodoCard.module.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../store/todo-slice';
import moment from 'moment';
import 'moment/locale/ru';

const MAX_LENGTH = 60;

const TodoCard = ({ todo, onMore }) => {
   const dispatch = useDispatch();

   const formattedTime = moment(todo.updateTime).fromNow();

   const shortDesc = todo.description?.length > MAX_LENGTH
      ? todo.description.slice(0, MAX_LENGTH) + "..."
      : todo.description || "";

   return (
      <div className={classes.card}>
         <div className={classes.header}>
            <div className={classes.name}>{todo.name}</div>
            <button className={classes.deleteBtn} onClick={() => dispatch(deleteTodo({ id: todo.id, userId: todo.userId }))}>
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
            <button className={classes.editBtn} onClick={() => onMore(todo)} title="Редактировать">
               <FaEdit />
            </button>
         </div>
      </div>
   );
};

export default TodoCard;
