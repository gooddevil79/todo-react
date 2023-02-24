import { uiActions } from './ui-slice';
import { tasksActions } from './todo-slice';
export const storeTaskData = function (tasksList) {
  return async dispatchFN => {
    dispatchFN(
      uiActions.showNotification({
        status: 'PENDING',
        title: 'Sending',
        message: 'sending data to the server...',
      })
    );
    const sendingData = async function () {
      const respone = await fetch(
        'https://reach-it-app-db-default-rtdb.firebaseio.com/tasks.json',
        {
          method: 'PUT',
          body: JSON.stringify(tasksList),
        }
      );
      if (!respone.ok) {
        throw new Error('cant send data');
      }
    };
    try {
      await sendingData();
      dispatchFN(
        uiActions.showNotification({
          status: 'SUCCESS',
          title: 'Succesfully',
          message: 'data successfully sent',
        })
      );
    } catch (err) {
      // console.log(err.message);
      uiActions.showNotification({
        status: 'ERROR',
        title: 'Error',
        message: 'Faild to send data, check your connection...',
      });
    }
  };
};
// //////////////////
export const fetchTaskData = function () {
  return async dispatchFN => {
    dispatchFN(
      uiActions.showNotification({
        status: 'FETCHING',
        title: 'Fetching',
        message: 'Fetching data!',
      })
    );
    const gettingData = async function () {
      const response = await fetch(
        'https://reach-it-app-db-default-rtdb.firebaseio.com/tasks.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const taksData = await gettingData();
      dispatchFN(
        uiActions.showNotification({
          status: 'SUCCESS',
          title: 'Succesfully',
          message: 'data successfully fetched',
        })
      );
      dispatchFN(
        tasksActions.replaceTaskList({
          taskslist: taksData || [],
        })
      );
    } catch (error) {
      dispatchFN(
        uiActions.showNotification({
          status: 'ERROR',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};
