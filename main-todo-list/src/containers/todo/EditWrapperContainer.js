import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo } from '../../store/todo-slice';
import { useEffect } from 'react';
import EditDescription from '../../components/edit/EditDescription';

const EditWrapperContainer = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { items: todos, loading } = useSelector(state => state.todo);
   const { user } = useSelector(state => state.auth);

   const todo = todos.find(t => t.id === id);

   useEffect(() => {
      if (!loading && !todo) {
         navigate('/todos'); // если задачи нет — назад
      }
   }, [loading, todo, navigate]);

   if (loading || !todo) {
      return <div style={{ padding: 20 }}>Загрузка...</div>;
   }

   const handleSave = async (newDesc) => {
      await dispatch(updateTodo({
         id: todo.id,
         userId: user.key,
         updates: {
            ...todo,
            description: newDesc,
            updateTime: Date.now()
         }
      }));
      navigate('/todos');
   };

   const handleCancel = () => {
      navigate('/todos');
   };

   return (
      <EditDescription
         todo={todo}
         onSave={handleSave}
         onCancel={handleCancel}
      />
   );
};

export default EditWrapperContainer;

