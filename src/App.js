import './App.css';
import {
  Alert,
  Box,
  Button,
  Collapse,
  CssBaseline,
  IconButton,
} from '@mui/material';
import Container from '@mui/material/Container';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import { useEffect, useState } from 'react';
import { fetchTaskData, storeTaskData } from './store/todo-action';
import { useSelector, useDispatch } from 'react-redux';
import { Close } from '@mui/icons-material';
let isInitial = true;
let firstRender = true;
function App() {
  const [open, setOpen] = useState(false);
  const tasks = useSelector(state => state.todoTasks);
  const dispatchFN = useDispatch();
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      setOpen(true);
    }
  });
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
      <Box
        sx={{
          width: '70%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: '1000',
        }}
      >
        <Collapse in={open}>
          <Alert
            variant="filled"
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Attention : This app works with <strong>Firbase API</strong>, in
            order to work correctly, please make sure you are connected to{' '}
            <strong>VPN </strong>, and reload the page.
          </Alert>
        </Collapse>
      </Box>
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
