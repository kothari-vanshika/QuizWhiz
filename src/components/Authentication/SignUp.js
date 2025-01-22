import { Box, TextField,Button } from '@material-ui/core';
import React, { useContext } from 'react'
import { quizcontext } from '../../context/context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
const SignUp = ({handleClose}) => {
  const navigate=useNavigate();
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [confirmpass,setConfirmpass]=React.useState('');
    const {alert,setAlert}=useContext(quizcontext);
    const handleSubmit=async()=>{
      if(password!==confirmpass){
        setAlert({
          open:true,
          message:'Passwords do not match.',
          type:'error'
          });
          return;
      }
      try{
        const result= await createUserWithEmailAndPassword(auth,email,password);
   setAlert({
      open:true,
      message:`Signed In Succesfully. Welcome user ${result.user.email}`,
      type:'success'
      });
      handleClose();
      // navigate("/user/take");
    }
    catch(error){
      setAlert({
        open:true,
        message:error.message,
        type:'error'
        });
        console.log(error.message);
    }
    return;

    }
  return (
    <div>
      <Box p={5} style={{backgroundColor:'rgb(159, 152, 152)',display:'flex',flexDirection:'column',gap:'20px'}}>
         <TextField style={{color:'black'}}variant='outlined' fullWidth type="email" label="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}> </TextField>
         <TextField variant='outlined' fullWidth type="password" label="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}> </TextField>
         <TextField variant='outlined' fullWidth type="password" label="Confirm Password" value={confirmpass} onChange={(e)=>setConfirmpass(e.target.value)}> </TextField>
      <Button variant="outlined" size="large" style={{backgroundColor:'black',color:'white',fontWeight:'bold',padding:'10'}} onClick={handleSubmit}>Sign Up</Button>
      </Box>
    </div>
  )
}

export default SignUp

