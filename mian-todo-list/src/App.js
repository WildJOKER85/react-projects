import './App.css';
import LoginForm from "./components/loginForm/LoginForm";
import UserRegister from './components/loginForm/UserRegister';
import TodoForm from './components/todoForm/TodoForm';
import { useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addUserHandler = (user) => {
    setUsers(prev => [...prev, user]);
    setShowLogin(true);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
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
      {isLoggedIn && <TodoForm user={currentUser} />}
      {!isLoggedIn && (showLogin
        ? <LoginForm users={users} onShowRegister={isShowLogin} onLogin={handleLogin} />
        : <UserRegister onRegister={addUserHandler} onShowRegister={isShowLogin} />
      )}
    </div>
  );
};

export default App;
