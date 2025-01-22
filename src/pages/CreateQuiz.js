import React, { useContext,useEffect,useState } from 'react'
import { getCategories } from '../utils/QuestionService';
import { createQuiz } from '../utils/QuizService';
import { MenuItem, Typography,FormControl,InputLabel ,Box,Button,Select,TextField,makeStyles} from '@material-ui/core';
import { quizcontext } from '../context/context';
const useStyles=makeStyles((theme)=>({
button:{
    fontSize:14,
     padding:'8px',
     whiteSpace:'nowrap',
     width:'10%'
},
[theme.breakpoints.down('md')]:{
    button:{
        fontSize:13,
        padding:'10px',
        width:'20%'
    }
},
[theme.breakpoints.down('sm')]:{
    button:{
        padding:'10px',
        fontSize:13,
        width:'20%'
    }
},
}));
const CreateQuiz = () => {
    const classes=useStyles();
    const [options,setoptions]=useState([""]);
    const [num,setNum]=useState(0);
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const {setAlert}=useContext(quizcontext);
    useEffect(()=>{
    const fetchCategories=async()=>{
        try{
     const response=await getCategories();
     setoptions(response);
        }
        catch(error){
            console.error(error);
        }
    }
    fetchCategories();
    },[])
    const handleCategoryChange=(e)=>{
        setCategory(e.target.value);
    }
    const handleNumChange=(e)=>{
        setNum(e.target.value);
    }
    const handleTitleChange=(e)=>{
        setTitle(e.target.value);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
     const response=await createQuiz(category,num,title);
     setAlert({
        open:true,
        message:'Created Quiz successfully',
        type:'success'
     });
        }
        catch(error){
            console.error(error);
        }
    }
  return (
   <Box p={5} style={{display:'flex',flexDirection:'column',gap:'30px'}}>
    <Typography variant="h4" style={{
          mb: 2,fontFamily:'Montserrat',fontWeight:'bold'}}>Create A New Quiz</Typography>
     <TextField type="text" variant="outlined" fullWidth placeholder="Enter the quiz title" label="Quiz Title" name="title" value={title} onChange={handleTitleChange}>
    
            </TextField>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
    <Select labelId="demo-simple-select-label"
          name="category"
          id="demo-simple-select"
          value={category}
          onChange={handleCategoryChange}>
            <MenuItem value="">Select a category</MenuItem>
            {options.map((option)=>(
                <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}

    </Select>
    </FormControl>
    <TextField variant="outlined" fullWidth type="number" label="Number of questions" placeholder="Enter the number of questions" name="num" value={num} onChange={handleNumChange}></TextField>
    <Button variant="contained" color='primary' className={classes.button} onClick={handleSubmit}>Create</Button>
   </Box>
  )
}

export default CreateQuiz
