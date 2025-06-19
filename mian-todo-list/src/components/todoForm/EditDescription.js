import classes from './EditDescription.module.css';
import { useState } from 'react';

const EditDescription = ({ description, onSave, onCancel }) => {
   const [value, setValue] = useState(description);

   // Автоматическое изменение высоты textarea
   const handleInput = (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
   };

   return (
      <div className={classes.editBlock}>
         <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            onInput={handleInput}
            className={classes.editArea}
            style={{ width: '100%', minHeight: '80px', resize: 'none' }}
            autoFocus
         />
         <div className={classes.editBtns}>
            <button onClick={() => onSave(value)}>Сохранить</button>
            <button onClick={onCancel}>Отмена</button>
         </div>
      </div>
   );
};

export default EditDescription;