import './App.css';
import LoginForm from "./components/loginForm/LoginForm";
import Header from "./components/header/Header";
import { useState } from 'react';
import TodoForm from './components/todoForm/TodoForm';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState([]);

  const addUserHandler = (user) => {
    setUsers(prev => [...prev, user]);
  };

  const loginHandler = () => {
    if (isLogin) {
      setIsLogin(false);
      return;
    }
    setIsLogin(true);
  };

  return (
    <div className="App">
      <Header />
      <TodoForm onAddUser={addUserHandler} />
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name}</li>
        ))}
      </ul>
      {/* {isLogin && <Header logOut={loginHandler} />} */}
      {/* {!isLogin && <LoginForm onLogin={loginHandler} />} */}
    </div>
  );
};

export default App;
