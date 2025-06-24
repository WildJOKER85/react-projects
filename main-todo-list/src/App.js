import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout, setAuthChecked } from './store/auth-slice';
import { updateTodo, fetchTodos } from './store/todo-slice';
import TodoForm from './components/todoForm/TodoForm';
import LoginForm from './components/loginForm/LoginForm';
import UserRegister from './components/loginForm/UserRegister';
import EditDescription from './components/todoForm/EditDescription';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user, isAuthChecked } = useSelector(state => state.auth);
  const { items: todos, loading: todosLoading } = useSelector(state => state.todo);

  // Состояние редактируемой задачи - с сохранением в localStorage
  const [editingTodoId, setEditingTodoId] = useState(() => localStorage.getItem('editingTodoId') || null);
  const [showLogin, setShowLogin] = useState(true);

  // При изменении editingTodoId - синхронизируем с localStorage
  useEffect(() => {
    if (editingTodoId) {
      localStorage.setItem('editingTodoId', editingTodoId);
    } else {
      localStorage.removeItem('editingTodoId');
    }
  }, [editingTodoId]);

  // Загрузка пользователя из localStorage + установка isAuthChecked
  useEffect(() => {
    const loadUser = async () => {
      const loginKey = localStorage.getItem('login');
      if (!loginKey) {
        dispatch(setAuthChecked(true));
        return;
      }
      try {
        const res = await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/users/${loginKey}.json`);
        const data = await res.json();
        if (data) {
          dispatch(setUser({ ...data, key: loginKey }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setAuthChecked(true));
      }
    };
    loadUser();
  }, [dispatch]);

  // После загрузки пользователя - загружаем todos
  useEffect(() => {
    if (user?.key) {
      dispatch(fetchTodos(user.key));
    }
  }, [user, dispatch]);

  // Если редактируемой задачи нет в списке (например, удалили), сбрасываем editingTodoId
  useEffect(() => {
    if (!todosLoading && editingTodoId && !todos.find(t => t.id === editingTodoId)) {
      setEditingTodoId(null);
    }
  }, [todos, editingTodoId, todosLoading]);

  const editingTodo = todos.find(t => t.id === editingTodoId);

  if (!isAuthChecked) return <div>Загрузка...</div>;

  const toggleLoginForm = () => setShowLogin(prev => !prev);

  return (
    <div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : isLoggedIn ? (
        editingTodoId && editingTodo ? (
          <EditDescription
            todo={editingTodo}
            onSave={async (newDesc) => {
              await dispatch(updateTodo({
                userId: user.key,
                id: editingTodo.id,
                updates: {
                  ...editingTodo,
                  description: newDesc,
                  updateTime: Date.now()
                }
              }));
              setEditingTodoId(null);
            }}
            onCancel={() => setEditingTodoId(null)}
          />
        ) : (
          <TodoForm
            user={user}
            onLogOut={() => dispatch(logout())}
            onEditTodo={setEditingTodoId} // передаём в карточку функцию, которая ставит id
          />
        )
      ) : (
        showLogin
          ? <LoginForm onShowRegister={toggleLoginForm} />
          : <UserRegister onShowRegister={toggleLoginForm} />
      )}
    </div>
  );
};

export default App;
