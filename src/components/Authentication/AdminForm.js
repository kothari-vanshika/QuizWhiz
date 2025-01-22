
import { Box, TextField,Button } from '@material-ui/core';
import React, { useContext } from 'react'
import { quizcontext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { specialKey } from '../../config/firebaseConfig';
const AdminForm = ({handleClose}) => {
    const navigate=useNavigate();
    const [key,setKey]=React.useState('');
    const {setAlert}=useContext(quizcontext);
    const handleSubmit=async()=>{
      if(key===specialKey){
        setAlert({
          open:true,
          message:'Welcome admin!',
          type:'success'
          });
      navigate("/admin");
    }
    else{
        setAlert({
            open:true,
            message:'Wrong admin key',
            type:'error'
        });
    }
    handleClose();
    return;
  }
  return (
    <div>
      <Box p={5} style={{backgroundColor:'rgb(159, 152, 152)',display:'flex',flexDirection:'column',gap:'20px'}}>
         <TextField variant='outlined' fullWidth type="password" label="Enter Admin Key" value={key} onChange={(e)=>setKey(e.target.value)}> </TextField>
      <Button variant="outlined" size="large" style={{backgroundColor:'black',color:'white',fontWeight:'bold',padding:'10'}} onClick={handleSubmit}>Login</Button>
      </Box>
    </div>
  )
}

export default AdminForm
