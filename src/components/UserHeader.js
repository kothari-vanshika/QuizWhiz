import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { quizcontext } from '../context/context';
import UserSidebar from './Authentication/UserSidebar';
const useStyles=makeStyles(()=>({
   title:{
   
    fontFamily:"Montserrat",
    fontWeight:"bold",
    color:'white'
   },
   container:{
    width:'100%',
    backgroundColor:"black",
   }
}));
export default function UserHeader() {
  const {user}=useContext(quizcontext);
  const classes = useStyles();
  const navigate=useNavigate();
  return (
    <div>
    <div className={classes.container}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            QuizWhiz
          </Typography>
          <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',flexGrow:1}}><UserSidebar/></div>
        </Toolbar>
      </AppBar>
    </div>
    </div>
  );
}