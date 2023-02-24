import './App.css';
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import { useEffect, useState } from 'react';
import { fetchTaskData, storeTaskData } from './store/todo-action';
import { useSelector, useDispatch } from 'react-redux';
let isInitial = true;
function App() {
  const tasks = useSelector(state => state.todoTasks);
  const dispatchFN = useDispatch();

  useEffect(() => {
    dispatchFN(fetchTaskData());
  }, [dispatchFN]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (tasks.listChanged) {
      dispatchFN(storeTaskData(tasks.tasksList));
    }
  }, [tasks, dispatchFN]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
        <Form />
      </Container>
      <Container maxWidth="md">
        <Tasks />
      </Container>
    </>
  );
}

export default App;
