import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Загрузка задач
export const fetchTodos = createAsyncThunk(
   'todos/fetchTodos',
   async (userId, thunkAPI) => {
      try {
         const res = await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos/${userId}.json`);
         const data = await res.json();

         const parsed = data
            ? Object.entries(data).map(([id, todo]) => ({ id, ...todo }))
            : [];

         return parsed;
      } catch {
         return thunkAPI.rejectWithValue("Ошибка загрузки задач");
      }
   }
);

// Добавление новой задачи
export const addTodo = createAsyncThunk(
   'todos/addTodo',
   async ({ userId, todo }, thunkAPI) => {
      try {
         const res = await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos/${userId}.json`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
         });
         const data = await res.json();

         //Возвращаем добавленную задачу с id
         return { id: data.name, ...todo };
      } catch {
         return thunkAPI.rejectWithValue("Ошибка при добавлении задачи");
      }
   }
);

// Удаление
export const deleteTodo = createAsyncThunk(
   'todos/deleteTodo',
   async ({ id, userId }, thunkAPI) => {
      try {
         const response = await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos/${userId}/${id}.json`, {
            method: 'DELETE',
         });

         if (!response.ok) {
            throw new Error('Удаление не удалось');
         }

         return id;
      } catch (error) {
         return thunkAPI.rejectWithValue("Ошибка при удалении задачи");
      }
   }
);

// Обновление
export const updateTodo = createAsyncThunk(
   'todos/updateTodo',
   async ({ id, updates, userId }, thunkAPI) => {
      try {
         await fetch(`https://todo-list-cf8bc-default-rtdb.firebaseio.com/todos/${userId}/${id}.json`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates)
         });
         return { id, updates };
      } catch {
         return thunkAPI.rejectWithValue("Ошибка при обновлении задачи");
      }
   }
);

// Slice
const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      items: [],
      loading: false,
      error: null
   },
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchTodos.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
         })
         .addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         .addCase(addTodo.fulfilled, (state, action) => {
            state.items.push(action.payload);
         })

         .addCase(deleteTodo.fulfilled, (state, action) => {
            state.items = state.items.filter(t => t.id !== action.payload);
         })

         .addCase(updateTodo.fulfilled, (state, action) => {
            const { id, updates } = action.payload;
            const index = state.items.findIndex(t => t.id === id);
            if (index !== -1) {
               state.items[index] = { id, ...updates };
            }
         });
   }
});

export default todoSlice.reducer;
