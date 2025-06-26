import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import TodoFormContainer from '../containers/todo/TodoFormContainer';

const UserTodo = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user, isLoggedIn } = useSelector(state => state.auth);

   useEffect(() => {
      if (!isLoggedIn) {
         navigate('/login');
      }
   }, [isLoggedIn, navigate]);

   const handleLogout = () => {
      console.log("Вызван выход из аккаунта");
      dispatch(logout());
      window.location.href = '/login';
   };

   return (
      <TodoFormContainer
         user={user}
         onLogOut={handleLogout}
         onEditTodo={(id) => navigate(`/todos/${id}/edit`)}
      />
   );
};

export default UserTodo;
