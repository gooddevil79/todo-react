import { Button, Grid, Input } from '@mui/material';
import { Add } from '@mui/icons-material';
import { tasksActions } from '../../store/todo-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
const Form = function () {
  const inputTaskValue = useRef();
  const dispatchFN = useDispatch();
  const tasks = useSelector(state => state.todoTasks);

  const onAddTaskHandler = function (e) {
    e.preventDefault();
    const enteredInput = inputTaskValue.current.value;

    if (!enteredInput) {
      alert('cant be empty');
      return;
    }
    const tasksLength = tasks.tasksList.length; // # getting tasks length in order to create dynamic ID
    const taksItem = {
      text: enteredInput,
      isCompleted: false,
      taskId: enteredInput.slice(0, 1) + (tasksLength + 1), // # creating dynamic ID
      isEditing: false,
    };
    dispatchFN(tasksActions.addTask(taksItem));
    inputTaskValue.current.value = ''; // # two way binding with ref
  };
  return (
    <form onSubmit={onAddTaskHandler}>
      <Grid
        container
        spacing={1}
        mt={1}
        alignItems="baseline"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8}>
          <Input
            id="standard-basic"
            label="Task"
            variant="standard"
            fullWidth
            placeholder="Enter your task here to get done"
            inputRef={inputTaskValue}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button fullWidth variant="contained" type="submit">
            <Add />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
