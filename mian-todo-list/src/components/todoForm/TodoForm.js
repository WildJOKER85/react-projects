import classes from './TodoForm.module.css';
import { useState } from 'react';
import Header from '../header/Header';
import TodoCard from './TodoCard';
import EditDescription from './EditDescription';

const TodoForm = ({ user }) => {
   const [inputValue, setInputValue] = useState('');
   const [areaValue, setAreaValue] = useState('');
   const [cards, setCards] = useState([]);
   const [editingIdx, setEditingIdx] = useState(null);

   const inputValueHandler = (e) => setInputValue(e.target.value);
   const areaValueHandler = (e) => setAreaValue(e.target.value);

   const submitHandler = (e) => {
      e.preventDefault();

      if (!inputValue.trim()) return;
      setCards(prev => [...prev, { name: inputValue, description: areaValue }]);
      setInputValue('');
      setAreaValue('');
   };

   const handleMore = (idx) => setEditingIdx(idx);
   // Если редактируем — показываем только редактор
   if (editingIdx !== null) {
      return (
         <EditDescription
            description={cards[editingIdx].description}
            onSave={(newDesc) => {
               setCards(cards =>
                  cards.map((c, i) =>
                     i === editingIdx ? { ...c, description: newDesc } : c
                  )
               );
               setEditingIdx(null);
            }}
            onCancel={() => setEditingIdx(null)}
         />
      );
   }

   return (
      <>
         <Header user={user} />
         <form className={classes.main} onSubmit={submitHandler}>
            <div className={classes.content}>
               <div className={classes.itemInput}>
                  <label htmlFor='name'>Заметка</label>
                  <input
                     type='text'
                     id='name'
                     onChange={inputValueHandler}
                     value={inputValue}
                  />
               </div>
               <div className={classes.areaBlock}>
                  <textarea
                     placeholder='Описание'
                     onChange={areaValueHandler}
                     value={areaValue}
                  />
               </div>
               <div className={classes.btn}>
                  <button type="submit">Добавить</button>
               </div>
            </div>
         </form>
         {cards.map((card, idx) => (
            <TodoCard
               key={idx}
               name={card.name}
               description={card.description}
               onMore={() => handleMore(idx)}
            />
         ))}
      </>
   );
};

export default TodoForm;