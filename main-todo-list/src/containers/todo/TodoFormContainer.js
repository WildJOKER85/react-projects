import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from '../../store/todo-slice';
import { useNavigate } from 'react-router-dom';
import TodoFormUI from '../../components/todo/TodoFormUI';

const TodoFormContainer = ({ user, onLogOut }) => {
   const [inputValue, setInputValue] = useState('');
   const [areaValue, setAreaValue] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { items: todos, loading, error } = useSelector(state => state.todo);

   const handleDelete = (id) => {
      dispatch(deleteTodo({ id, userId: user.key }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!inputValue.trim() && !areaValue.trim()) return;

      const now = Date.now();
      dispatch(addTodo({
         userId: user.key,
         todo: {
            name: inputValue,
            description: areaValue,
            userId: user.key,
            createTime: now,
            updateTime: now,
         },
      }));

      setInputValue('');
      setAreaValue('');
   };

   const handleEdit = (id) => {
      navigate(`/todos/${id}/edit`);
   };

   return (
      <TodoFormUI
         user={user}
         todos={todos}
         error={error}
         loading={loading}
         inputValue={inputValue}
         areaValue={areaValue}
         onInputChange={setInputValue}
         onAreaChange={setAreaValue}
         onSubmit={handleSubmit}
         onDelete={handleDelete}
         onEdit={handleEdit}
         onLogOut={onLogOut}
      />
   );
};

export default TodoFormContainer;