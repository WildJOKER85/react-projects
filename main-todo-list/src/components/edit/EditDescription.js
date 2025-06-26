import classes from './EditDescription.module.css';
import { useState, useEffect, useRef } from 'react';

const EditDescription = ({ onSave, todo, onCancel }) => {
   const [value, setValue] = useState(todo.description || "");
   const textareaRef = useRef(null);

   useEffect(() => {
      const el = textareaRef.current;
      if (el) {
         el.style.height = 'auto';
         el.style.height = el.scrollHeight + 'px';
      }
   }, [value]);

   const handleInput = (e) => {
      setValue(e.target.value);
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
         onCancel();
      }
      if (e.key === 'Enter' && e.ctrlKey) {
         onSave(value);
      }
   };

   return (
      <div className={classes.editBlock}>
         <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className={classes.editArea}
            style={{ width: '100%', minHeight: '140px', resize: 'none' }}
            autoFocus
         />
         <div className={classes.editBtns}>
            <button type="button" onClick={() => onSave(value)}>Сохранить</button>
            <button type="button" onClick={onCancel}>Отмена</button>
         </div>
      </div>
   );
};

export default EditDescription;