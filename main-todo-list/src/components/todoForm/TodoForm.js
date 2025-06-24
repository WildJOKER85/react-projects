import classes from './TodoForm.module.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Header from '../header/Header';
import TodoCard from './TodoCard';
import EditDescription from './EditDescription';

const TodoForm = ({ user, onLogOut }) => {
   const [inputValue, setInputValue] = useState('');
   const [areaValue, setAreaValue] = useState('');
   const [cards, setCards] = useState([]);
   const [editingIdx, setEditingIdx] = useState(null);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const idx = localStorage.getItem('editingIdx');
      if (idx !== null) setEditingIdx(Number(idx));
      getTodos();
   }, []);

   const formattedTime = (timestamp) => {
      moment.locale('ru');
      return moment(timestamp).fromNow();
   };

   const getTodos = async () => {
      try {
         const response = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos.json");
         const data = await response.json();

         const todos = Object.entries(data || {})
            .map(([key, val]) => ({ ...val, key }))
            .filter(todo => todo.userId === user.key)
            .sort((a, b) => b.updateTime - a.updateTime);

         const mapped = todos.map(todo => ({
            ...todo,
            updateTime: formattedTime(todo.updateTime)
         }));

         setCards(mapped);
         setError(null);
      } catch (error) {
         setError("Не удалось загрузить задачи. Попробуйте позже.");
      } finally {
         setIsLoading(false);
      }
   };

   const handleEditCancel = () => {
      setEditingIdx(null);
      localStorage.removeItem('editingIdx');
   };

   const handleEditSave = async (newDesc) => {
      const todo = cards[editingIdx];
      if (!todo || !todo.key) return;

      try {
         const updateTime = Date.now();

         await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos/${todo.key}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: newDesc, updateTime })
         });

         setCards(cards =>
            cards.map((c, i) =>
               i === editingIdx ? { ...c, description: newDesc, updateTime: formattedTime(updateTime) } : c
            )
         );
      } catch (err) {
         console.error("Ошибка при сохранении:", err);
      }
      handleEditCancel();
   };

   const inputValueHandler = (e) => setInputValue(e.target.value);
   const areaValueHandler = (e) => setAreaValue(e.target.value);

   const submitHandler = async (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const createTime = Date.now();

      try {
         const res = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               name: inputValue,
               description: areaValue,
               userId: user.key,
               createTime,
               updateTime: createTime
            })
         });

         const data = await res.json();
         const newKey = data.name;

         setCards(prev => [
            {
               name: inputValue,
               description: areaValue,
               userId: user.key,
               createTime,
               updateTime: formattedTime(createTime),
               key: newKey
            },
            ...prev
         ]);

         setInputValue('');
         setAreaValue('');
      } catch (error) {
         setError("Не удалось сохранить задачу. Попробуйте позже.");
      }
   };

   const handleMore = (idx) => {
      setEditingIdx(idx);
      localStorage.setItem('editingIdx', idx);
   };

   const handleDelete = async (idx) => {
      const todo = cards[idx];
      if (!todo || !todo.key) return;

      try {
         await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos/${todo.key}.json`, {
            method: "DELETE"
         });
         setCards(cards => cards.filter((_, i) => i !== idx));
      } catch (err) {
         setError("Не удалось удалить задачу.");
      }
   };

   if (isLoading) return null;

   if (editingIdx !== null && cards[editingIdx]) {
      return (
         <EditDescription
            description={cards[editingIdx].description}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
         />
      );
   }

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
                     onChange={inputValueHandler}
                     value={inputValue}
                     placeholder="Введите заголовок"
                  />
               </div>
               <textarea
                  className={classes.textarea}
                  placeholder='Описание'
                  onChange={areaValueHandler}
                  value={areaValue}
               />
               <button type="submit" className={classes.submitBtn}>Добавить</button>
            </div>
         </form>

         {cards.length === 0 ? (
            <div className={classes.zero}>Пока нет ни одной Todos</div>
         ) : (
            cards.map((card, idx) => (
               <TodoCard
                  key={card.key || idx}
                  name={card.name}
                  description={card.description}
                  updateTime={card.updateTime}
                  onMore={() => handleMore(idx)}
                  onDelete={() => handleDelete(idx)}
               />
            ))
         )}
      </>
   );
};

export default TodoForm;