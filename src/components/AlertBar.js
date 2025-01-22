import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import React, { useContext } from 'react';
import { quizcontext } from "../context/context";

const AlertBar = () => {
    const {alert,setAlert}=useContext(quizcontext);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert({open:false});
    }
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert severity={alert.type} elevation={6} onClose={handleClose} variant="filled">
            {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}
export default AlertBar;