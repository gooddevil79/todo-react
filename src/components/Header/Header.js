import { AppBar, Toolbar, Typography } from '@mui/material';
import { CloudDone, TaskAlt } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box } from '@mui/system';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
const Header = function (props) {
  // # handleing feedback messages to user
  const notification = useSelector(state => state.uiStore.notification);
  let status;
  let message = '';
  let title = '';
  if (notification) {
    message = notification.message;
    title = notification.title;
    status = notification.status;
  }
  let statusIcon = '';
  if (status === 'SUCCESS') statusIcon = <CloudDone />;
  if (status === 'PENDING') statusIcon = <CloudUploadIcon />;
  if (status === 'ERROR') statusIcon = <CloudOffIcon />;
  if (status === 'FETCHING') statusIcon = <CloudDownloadIcon />;
  return (
    <Fragment>
      <AppBar position="relative">
        <Toolbar>
          <TaskAlt />
          <Typography variant="h6" sx={{ display: 'inline-block' }} pl={1}>
            Reach it
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component={'div'}
        ml={'auto'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid',
        }}
      >
        <Typography variant="p">{statusIcon}</Typography>
      </Box>
    </Fragment>
  );
};
export default Header;
