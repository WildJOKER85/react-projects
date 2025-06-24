import classes from './TodoCard.module.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const MAX_LENGTH = 60;

const TodoCard = ({ name, description, updateTime, onMore, onDelete }) => {
   const shortDesc = description.length > MAX_LENGTH ? description.slice(0, MAX_LENGTH) + "..." : description;

   return (
      <div className={classes.card}>
         <div className={classes.header}>
            <div className={classes.name}>{name}</div>
            <button className={classes.deleteBtn} onClick={onDelete} title="Удалить">
               <FaTrashAlt />
            </button>
         </div>

         <div className={classes.desc}>
            {shortDesc || <em>Нет описания</em>}
         </div>

         <div className={classes.footer}>
            <span className={classes.time}>{updateTime}</span>
            <button className={classes.editBtn} onClick={onMore} title="Редактировать">
               <FaEdit />
            </button>
         </div>
      </div>
   );
};

export default TodoCard;

