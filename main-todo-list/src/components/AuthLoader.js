import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setAuthChecked } from '../store/auth-slice';
import { fetchTodos } from '../store/todo-slice';

const AuthLoader = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const loginKey = sessionStorage.getItem('login');
      if (!loginKey) {
         dispatch(setAuthChecked(true));
         return;
      }

      const loadUser = async () => {
         try {
            const res = await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/users/${loginKey}.json`);
            const data = await res.json();

            if (data) {
               dispatch(setUser({ ...data, key: loginKey }));
               await dispatch(fetchTodos(loginKey));
            }
         } catch (error) {
            console.error('Ошибка загрузки пользователя', error);
         } finally {
            dispatch(setAuthChecked(true));
         }
      };

      loadUser();
   }, [dispatch]);

   return null; // компонент ничего не рисует
};

export default AuthLoader;
