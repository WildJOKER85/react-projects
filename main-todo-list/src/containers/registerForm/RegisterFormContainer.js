import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import RegisterFormUI from '../../components/registerForm/RegisterFormUI';

const RegisterFormContainer = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { error, isLoading, registered } = useSelector(state => state.auth);

   const [login, setLogin] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [userName, setUserName] = useState('');
   const [userSurName, setUserSurName] = useState('');
   const [userDate, setUserDate] = useState('');
   const [localError, setLocalError] = useState('');

   const onSubmit = (e) => {
      e.preventDefault();

      if (!login || !password || !confirmPassword || !userName || !userSurName || !userDate) {
         setLocalError("Пожалуйста, заполните все поля!");
         return;
      }

      if (password.length < 6) {
         setLocalError("Пароль должен быть не менее 6 символов!");
         return;
      }

      if (password !== confirmPassword) {
         setLocalError("Пароли не совпадают!");
         return;
      }

      setLocalError('');
      dispatch(registerUser({ login, password, userName, userSurName, userDate }));
   };

   useEffect(() => {
      if (registered) {
         navigate('/login');
      }
   }, [registered, navigate]);

   return (
      <RegisterFormUI
         login={login}
         password={password}
         confirmPassword={confirmPassword}
         userName={userName}
         userSurName={userSurName}
         userDate={userDate}
         onChangeLogin={(e) => setLogin(e.target.value)}
         onChangePassword={(e) => setPassword(e.target.value)}
         onChangeConfirmPassword={(e) => setConfirmPassword(e.target.value)}
         onChangeUserName={(e) => setUserName(e.target.value)}
         onChangeUserSurName={(e) => setUserSurName(e.target.value)}
         onChangeUserDate={(e) => setUserDate(e.target.value)}
         onSubmit={onSubmit}
         onBack={() => navigate('/login')}
         error={error || localError}
         isLoading={isLoading}
      />
   );
};

export default RegisterFormContainer;
