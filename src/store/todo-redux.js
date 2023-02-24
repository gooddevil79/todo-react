import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './todo-slice';
import uiSlice from './ui-slice';
const store = configureStore({
  reducer: {
    todoTasks: tasksSlice.reducer,
    uiStore: uiSlice.reducer,
  },
});
export default store;
