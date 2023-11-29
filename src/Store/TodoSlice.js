// todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    updateTodo: (state, action) => {
      const { idtoupdate, text } = action.payload;
      const todo = state.find((todo) => todo.id === idtoupdate);
      if (todo) {
        todo.text = text;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const { id } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteAllTodos: (state) => {
        return [];
      },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleComplete ,deleteAllTodos} = todoSlice.actions;
export default todoSlice.reducer;
