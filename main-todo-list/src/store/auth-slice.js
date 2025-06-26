import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';
import { fetchTodos } from './todo-slice';

// --- Асинхронная авторизация пользователя
export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async ({ login, password }, thunkAPI) => {
      try {
         const res = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/users.json");
         const data = await res.json();

         for (const [key, user] of Object.entries(data || {})) {
            if (
               user.name &&
               user.hashedPassword &&
               user.name.trim().toLowerCase() === login.trim().toLowerCase() &&
               bcrypt.compareSync(password, user.hashedPassword)
            ) {
               sessionStorage.setItem('login', key);

               // Загружаем задачи сразу после логина
               thunkAPI.dispatch(fetchTodos(key));

               return { ...user, key };
            }
         }

         return thunkAPI.rejectWithValue("Неверный логин или пароль");
      } catch {
         return thunkAPI.rejectWithValue("Ошибка при входе");
      }
   }
);

export const registerUser = createAsyncThunk(
   'auth/registerUser',
   async (newUserData, thunkAPI) => {
      const { login, password, userName, userSurName, userDate } = newUserData;

      try {
         const res = await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/users.json");
         const data = await res.json();

         const isExist = Object.values(data || {}).some(
            u => u.name.trim().toLowerCase() === login.trim().toLowerCase()
         );
         if (isExist) {
            return thunkAPI.rejectWithValue("Логин уже используется");
         }

         const salt = bcrypt.genSaltSync(10);
         const hashedPassword = bcrypt.hashSync(password, salt);

         await fetch("https://todo-list-cf8bc-default-rtdb.firebaseio.com/users.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               name: login,
               hashedPassword,
               userName,
               userSurName,
               userDate
            })
         });

         return true;
      } catch {
         return thunkAPI.rejectWithValue("Ошибка при регистрации");
      }
   }
);

// --- Слайс
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,
      registered: false,
      isAuthChecked: false
   },
   reducers: {
      logout(state) {
         state.user = null;
         state.isLoggedIn = false;
         sessionStorage.removeItem('login'); // ← этот ключ должен исчезнуть
      },
      setUser(state, action) {
         state.user = action.payload;
         state.isLoggedIn = true;
      },
      setAuthChecked(state, action) {
         state.isAuthChecked = action.payload;
      },
      clearError(state) {
         state.error = null;
      }
   },

   extraReducers: (builder) => {
      // login
      builder
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
         })

         // register
         .addCase(registerUser.pending, (state) => {
            state.error = null;
            state.isLoading = true;
            state.registered = false;
         })
         .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.registered = true;
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
         });
   }
});

export const { logout, setUser, setAuthChecked, clearError } = authSlice.actions;
export default authSlice.reducer;
