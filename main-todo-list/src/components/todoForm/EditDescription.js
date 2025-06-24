import classes from './EditDescription.module.css';
import { useState, useEffect, useRef } from 'react';

const EditDescription = ({ description, onSave, onCancel }) => {
   const [value, setValue] = useState(description);
   const textareaRef = useRef(null);

   const adjustHeight = () => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
   };

   const handleInput = (e) => {
      setValue(e.target.value);
      adjustHeight();
   };

   useEffect(() => {
      adjustHeight();
   }, [value]);

   return (
      <div className={classes.editBlock}>
         <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
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