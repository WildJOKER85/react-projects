
import LoginForm from "./components/loginForm/LoginForm";
import UserRegister from './components/loginForm/UserRegister';
import TodoForm from './components/todoForm/TodoForm';
import { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка localStorage при загрузке
  useEffect(() => {
    const fetchUserData = async () => {
      const loginKey = localStorage.getItem('login');
      if (loginKey) {
        try {
          const res = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/users.json");
          const data = await res.json();

          if (data && data[loginKey]) {
            setCurrentUser({ ...data[loginKey], key: loginKey });
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Ошибка при загрузке данных пользователя:", error);
        }
      }
      setIsLoading(false); // <-- Снимаем загрузку после проверки
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'login') {
        if (e.newValue) {
          window.location.reload(); // или вызови fetchUserData()
        } else {
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);


  const addUserHandler = (user) => {
    setUsers(prev => [...prev, user]);
    setShowLogin(true);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('login');
  };

  const isShowLogin = () => {
    if (!showLogin) {
      setShowLogin(true);
      return;
    }
    setShowLogin(false);
  };

  return (
    <div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : isLoggedIn ? (
        <TodoForm user={currentUser} onLogOut={handleLogout} />
      ) : (
        showLogin
          ? <LoginForm users={users} onShowRegister={isShowLogin} onLogin={handleLogin} />
          : <UserRegister onRegister={addUserHandler} onShowRegister={isShowLogin} />
      )}
    </div>
  );
};

export default App;
