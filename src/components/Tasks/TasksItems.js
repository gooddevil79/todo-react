import { CircleOutlined, Delete, Edit, TaskAlt } from '@mui/icons-material';
import {
  Button,
  CardActions,
  Grid,
  Input,
  Paper,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import classes from './TasksItems.module.css';
import { tasksActions } from '../../store/todo-slice';
import { useRef, useState } from 'react';
/////////////////////////////////
const TasksItems = function (props) {
  // const classes = makeStyles(theme => ({
  //   completed: {
  //     backgroundColor: '#91f10bda',
  //   },
  // }));
  const [isEditting, setIsEditting] = useState(false);
  const newTextInputRef = useRef('');
  const dispatchFN = useDispatch();
  const onCompleteTask = function (e) {
    dispatchFN(tasksActions.completeTask(props.id));
  };

  const onDeleteTask = function (e) {
    e.preventDefault();
    dispatchFN(tasksActions.removeTask(props.id));
  };

  const onEditTask = function (e) {
    e.preventDefault();
    setIsEditting(true);
  };

  const onCancelEditting = function (e) {
    e.preventDefault();
    setIsEditting(false);
  };
  const onSubmitEditting = function (e) {
    e.preventDefault();
    const newText = newTextInputRef.current.value;
    console.log(newText);
    dispatchFN(tasksActions.editTask({ id: props.id, newText: newText }));
    setIsEditting(false);
  };
  return (
    <Paper
      elevation={4}
      key={props.id}
      className={
        props.isCompleted
          ? `${classes.completed} ${classes.task}`
          : `${classes.task}`
      }
    >
      <Grid
        container
        alignItems={'center'}
        justifyContent={'space-between'}
        p={1}
        m={1}
      >
        {props.isCompleted ? <TaskAlt /> : <CircleOutlined />}
        {!isEditting && (
          <Grid item mr="auto" onClick={onCompleteTask} xs={8} ml={1}>
            <Typography variant="p" gutterBottom fontSize={25}>
              {props.text}
            </Typography>
          </Grid>
        )}
        {isEditting && (
          <Grid item mr="auto" xs={8} ml={1}>
            <Input
              id="standard-basic"
              label="Task"
              variant="standard"
              fullWidth
              inputRef={newTextInputRef}
              autoFocus
            />
          </Grid>
        )}
        <Grid item xs={3}>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<Edit />}
              onClick={isEditting ? onSubmitEditting : onEditTask}
            >
              {isEditting ? 'Ok' : 'Edit'}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={isEditting ? onCancelEditting : onDeleteTask}
            >
              {isEditting ? 'Cancel' : 'Delete'}
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default TasksItems;
