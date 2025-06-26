import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import LoginFormUI from '../../components/loginForm/LoginFormUI';

const LoginFormContainer = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { error, isLoading } = useSelector(state => state.auth);

   const [login, setLogin] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ login, password }));
   };

   const goToRegister = () => {
      dispatch(clearError());
      navigate('/register');
   };

   return (
      <LoginFormUI
         login={login}
         password={password}
         onChangeLogin={(e) => setLogin(e.target.value)}
         onChangePassword={(e) => setPassword(e.target.value)}
         onSubmit={handleSubmit}
         onGoToRegister={goToRegister}
         error={error}
         isLoading={isLoading}
      />
   );
};

export default LoginFormContainer;

