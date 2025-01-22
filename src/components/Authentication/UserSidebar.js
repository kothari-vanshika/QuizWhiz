import React from 'react';
import { Drawer, makeStyles,Button, Typography,Box} from '@material-ui/core';
import {Avatar} from '@material-ui/core';
import { quizcontext } from '../../context/context';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
const useStyles=makeStyles((theme)=>({
    container:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:'rgb(235, 230, 230)',
        width:250,
        height:'100%',
       padding:25
    },
    tagline:{
      display: 'block', // Ensures the text takes up its own line
    width: '100%',    // Makes sure the text wraps within the container
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: '20px', // Use 'px' for font size units
    fontWeight: 'bold',
    wordWrap: 'break-word', // Enables word wrapping
    overflowWrap: 'break-word'
    },
    profile:{
        display:'flex',
        flexDirection:'column',
        gap:'15px',
        alignItems:'center',
        height:'92%',
    },
    picture:{
        height:100,
        width:100,
        objectFit:'contain',
        cursor:'pointer',
        backgroundColor:'grey'
    },
    [theme.breakpoints.down('md')]:{
      container:{
        width:150
      },
      picture:{
        height:50,
        width:50
        
      },
      tagline:{
        fontSize:'16px'
      }
    },
    [theme.breakpoints.down('sm')]:{
      container:{
        width:100
      },
      tagline:{
        fontSize:'15px'
      }
    },
}));
const UserSidebar=()=> {
    const classes = useStyles();
    const {user,setAlert}=useContext(quizcontext);
   const navigate=useNavigate();
    
    const [state, setState] = React.useState({
      right: false,
    });
    if (!user) {
        return <p>No user is logged in</p>; // Handle the case where no user is logged in
      }
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
    const logout=()=>{
      signOut(auth);
      setAlert({
       open:true,
       message:'Signed out Succesfully',
       type:'success'
      });
      toggleDrawer();
      navigate("/");
    }
    return (
        <div >
          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
                {user && <Avatar onClick={toggleDrawer(anchor,true)} src={user.photoURL} alt={user.displayName||user.email} style={{backgroundColour:'grey',height:'40',width:'40',cursor:'pointer'}}></Avatar>}
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                <div className={classes.container}>
                    <div className={classes.profile}>
            <Avatar className={classes.picture} src={user.photoURL} alt={user.displayName||user.email}></Avatar>
            <Box style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
            <Typography  className={classes.tagline}>{user.displayName||user.email}</Typography>
            </Box>
            
                    </div>
                    <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                   <Button onClick={()=>logout()}  variant='outlined' style={{padding:'10',backgroundColor:'black',color:'white'}}>Logout</Button>
                   </div>
                </div>
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      );
}
export default UserSidebar;