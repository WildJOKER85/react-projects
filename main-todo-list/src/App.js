import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './pages/Login';
import Register from './pages/Register';
import UserTodo from './pages/UserTodo';
import EditWrapperContainer from './containers/todo/EditWrapperContainer';
import AuthLoader from './components/AuthLoader';

const App = () => {
  const { isAuthChecked, isLoggedIn } = useSelector(state => state.auth);

  return (
    <>
      <AuthLoader />
      {!isAuthChecked
        ? <div style={{ padding: 20 }}>Загрузка...</div>
        : (
          <Routes>
            <Route path="/" element={<Navigate to={isLoggedIn ? "/todos" : "/login"} />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/todos" /> : <Login />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/todos" /> : <Register />} />
            <Route path="/todos" element={isLoggedIn ? <UserTodo /> : <Navigate to="/login" />} />
            <Route path="/todos/:id/edit" element={isLoggedIn ? <EditWrapperContainer /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
    </>
  );
};

export default App;
