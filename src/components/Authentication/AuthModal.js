import React, { useContext } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AppBar ,Tabs,Tab,Box} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { signInWithPopup } from 'firebase/auth';
import { quizcontext } from '../../context/context';
import { auth } from '../../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius:10
  },
  google:{
    backgroundColor:'rgb(159, 152, 152)',
    flex:1,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    padding:25,
    paddingTop:0,
    marginTop:'-20px',
    textAlign:'center',
    gap: 20,
    fontSize:20
  }
}));

export default function AuthModal() {
  const classes = useStyles();
  const navigate=useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
   const {setAlert}=useContext(quizcontext);
   const provider=new GoogleAuthProvider();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const handleSignInGoogle=()=>{
    signInWithPopup(auth,provider).then(res=>{
      setAlert({
         open:true,
         message:`Welcome user ${res.user.email}`,
         type:'success'
      });
      handleClose();
    }).catch(error=>{
      setAlert({
        open:true,
        message:error.message,
        type:'error'
     });
     return;
    })
  }
  return (
    <div>
      <button type="button" onClick={handleOpen} style={{cursor:'pointer',backgroundColor:'transparent',border:'none',marginLeft:"30px",color:"white",fontFamily:"Montserrat",fontSize:20}}>
        USER
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <AppBar position="static" style={{backgroundColor:'black',color:'white'}}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth" style={{borderRadius:10}}>
    <Tab label="Login" style={{fontWeight:"bold"}} />
    <Tab label="Sign Up"  style={{fontWeight:"bold"}} />
  </Tabs>
      </AppBar> 
      {value===0 && <Login handleClose={handleClose}/>} 
      {value===1 && <SignUp handleClose={handleClose}/>}
      <Box className={classes.google}>
    <span>
        OR
    </span>
    <GoogleButton style={{width:'100%',outline:'none'}} onClick={()=>handleSignInGoogle()}></GoogleButton>
 </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
