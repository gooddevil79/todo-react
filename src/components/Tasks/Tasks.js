import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import TasksItems from './TasksItems';
/////////////////////////////////
const Tasks = function (props) {
  const tasks = useSelector(state => state.todoTasks);

  let content = (
    <Typography variant="h6" gutterBottom textAlign="center">
      No task found, maybe add some?
    </Typography>
  );

  if (tasks.tasksList.length > 0) {
    content = tasks.tasksList.map(item => {
      return (
        <TasksItems
          key={item.taskId}
          text={item.text}
          id={item.taskId}
          isCompleted={item.isCompleted}
        />
      );
    });
  }
  return (
    <Grid container mt={3}>
      <Grid item xs={12} mb={2}>
        {content}
      </Grid>
    </Grid>
  );
};
export default Tasks;
