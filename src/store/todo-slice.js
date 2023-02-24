import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createStore } from 'redux';
const initialTaskState = { tasksList: [], listChanged: false }; // # initialazation tasks state
const tasksSlice = createSlice({
  //# creating slice for task
  name: 'tasks',
  initialState: initialTaskState,
  reducers: {
    // # reducer methods defenitions
    addTask(state, action) {
      state.tasksList.push(action.payload);
      state.listChanged = true;
    },

    removeTask(state, action) {
      const filteredTasks = state.tasksList.filter(
        task => task.taskId !== action.payload
      );
      state.tasksList = filteredTasks;
      state.listChanged = true;
    },

    completeTask(state, action) {
      const completedTask = state.tasksList.find(task => {
        return task.taskId === action.payload;
      });
      completedTask.isCompleted = !completedTask.isCompleted;
      state.listChanged = true;
    },

    editTask(state, action) {
      const certainTask = state.tasksList.find(task => {
        return task.taskId === action.payload.id;
      });
      certainTask.text = action.payload.newText;
      state.listChanged = true;
    },
    replaceTaskList(state, action) {
      state.tasksList = action.payload.taskslist;
      console.log(state.tasksList);
    },
  },
});

// # Exporting actions and sotre below
export const tasksActions = tasksSlice.actions;
export default tasksSlice;
