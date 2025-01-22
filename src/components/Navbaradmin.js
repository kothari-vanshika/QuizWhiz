import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Drawer, useMediaQuery, useTheme } from '@material-ui/core';
import AuthModal from './Authentication/AuthModal'
import { quizcontext } from '../context/context';
import UserSidebar from './Authentication/UserSidebar';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles=makeStyles(()=>({
   title:{
    fontSize:30,
    fontFamily:"Montserrat",
    fontWeight:"bold",
    color:'white'
   },
   button:{
    marginBottom:"40px",
    color:"white",
    fontFamily:"Montserrat",
    fontSize:15,
    fontWeight:'bold',
    whiteSpace:'nowrap',
    width:'100%',
    padding:'10px',
    backgroundColor:'black',
    borderRadius:'10px'
   },
   container:{
    backgroundColor:"black",
    width:'100%',
    flexGrow:'1'
   },
   container2:{
    display:'flex',
    flexDirection:'column',
    backgroundColor:'rgb(235, 230, 230)',
    width:180,
    height:'100%',
   padding:30
   }
}));
export default function Navbaradmin() {
  const {user}=useContext(quizcontext);
  const classes = useStyles();
  const navigate=useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const theme=useTheme();
  const isMediumorSmall=useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
    <div className={classes.container}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            QuizWhiz
          </Typography>
         {!isMediumorSmall?
        ( <div>
          <Button style={{marginLeft:"30px",color:"white",fontFamily:"Montserrat",fontSize:20}} onClick={()=>navigate("/admin/add")}>Add Question</Button>
          <Button style={{marginLeft:"30px",color:"white",fontFamily:"Montserrat",fontSize:20}} onClick={()=>navigate("/admin/show")}>Show Questions</Button>
          <Button style={{marginLeft:"30px",color:"white",fontFamily:"Montserrat",fontSize:20}} onClick={()=>navigate("/admin/create")}>Create Quiz</Button>
          <Button style={{marginLeft:"30px",color:"white",fontFamily:"Montserrat",fontSize:20}} onClick={()=>navigate("/admin")}>View Quizzes</Button>
         </div>):
       (
        <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <div>
              <MenuIcon onClick={toggleDrawer(anchor,true)} style={{
    cursor: 'pointer',
    color: 'white', 
    fontSize: '30px',
    fontWeight:'bold' 
  }}></MenuIcon>
  </div>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                <div className={classes.container2}>
                  <div style={{marginTop:30}}>
                <Button className={classes.button} onClick={()=>navigate("/admin/add")}>Add Question</Button>
          <Button className={classes.button} onClick={()=>navigate("/admin/show")}>Show Questions</Button>
          <Button className={classes.button} onClick={()=>navigate("/admin/create")}>Create Quiz</Button>
          <Button className={classes.button} onClick={()=>navigate("/admin")}>View Quizzes</Button>
          </div>
                </div>
              </Drawer>
            </React.Fragment>
          ))}
        </div>)}
        </Toolbar>
      </AppBar>
    </div>
    </div>
  );
}