import { useState, useEffect } from 'react';
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

  // Читаем из localStorage, чтобы определить, показывать форму логина или регистрации
  const [showLogin, setShowLogin] = useState(() => {
    const saved = localStorage.getItem('showLogin');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    localStorage.setItem('showLogin', JSON.stringify(showLogin));
  }, [showLogin]);

  useEffect(() => {
    const loginKey = localStorage.getItem('login');
    const savedEditId = localStorage.getItem('editingTodoId');

    if (!loginKey) {
      dispatch(setAuthChecked(true));
      setInitialLoadComplete(true);
      return;
    }

    const fetchUserAndTodos = async () => {
      try {
        const res = await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/users/${loginKey}.json`);
        const data = await res.json();
        if (data) {
          dispatch(setUser({ ...data, key: loginKey }));
          await dispatch(fetchTodos(loginKey)); // ждём загрузки
          if (savedEditId) setEditingTodoId(savedEditId);
        }
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error);
      } finally {
        dispatch(setAuthChecked(true));
        setInitialLoadComplete(true);
      }
    };

    fetchUserAndTodos();
  }, [dispatch]);

  const toggleLoginForm = () => setShowLogin(prev => !prev);

  const handleEditTodo = (id) => {
    setEditingTodoId(id);
    localStorage.setItem('editingTodoId', id);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    localStorage.removeItem('editingTodoId');
  };

  const handleSaveEdit = async (newDesc) => {
    const todo = todos.find(t => t.id === editingTodoId);
    if (!todo) return;

    await dispatch(updateTodo({
      userId: user.key,
      id: todo.id,
      updates: {
        ...todo,
        description: newDesc,
        updateTime: Date.now()
      }
    }));

    handleCancelEdit();
  };

  if (!isAuthChecked || !initialLoadComplete) {
    return <div style={{ padding: 20 }}>Загрузка...</div>;
  }

  const editingTodo = todos.find(t => t.id === editingTodoId);

  return (
    <div>
      {isLoading || (isLoggedIn && todosLoading) ? (
        <div style={{ padding: 20 }}>Загрузка задач...</div>
      ) : isLoggedIn ? (
        editingTodoId && editingTodo ? (
          <EditDescription
            todo={editingTodo}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <TodoForm
            user={user}
            onLogOut={() => {
              dispatch(logout());
              localStorage.removeItem('editingTodoId');
            }}
            onEditTodo={handleEditTodo}
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
