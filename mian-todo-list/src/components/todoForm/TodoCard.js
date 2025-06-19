import classes from './TodoCard.module.css';

const MAX_LENGTH = 40;

const TodoCard = ({ name, description, onMore }) => {
   const shortDesc = description.length > MAX_LENGTH ? description.slice(0, MAX_LENGTH) + "..."
      : description;

   return (
      <div className={classes.cardBlock}>
         <div className={classes.card}>
            <p>Имя: {name}</p>
            <p className={classes.desc}>
               Описание: {shortDesc}
               {description.length > MAX_LENGTH && (
                  <button className={classes.moreBtn} onClick={onMore}>
                     ещё
                  </button>
               )}
            </p>
         </div>
      </div>
   );
};

export default TodoCard;

