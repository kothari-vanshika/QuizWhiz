import React, { useContext,useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getQuestionById ,getCategories, updateQuestion} from '../utils/QuestionService';
import { quizcontext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import {Box, Button,TextField,FormControl,InputLabel,Select,MenuItem,makeStyles } from '@material-ui/core';
const useStyles=makeStyles((theme)=>({
button:{
    fontSize:14,
     padding:'8px',
     whiteSpace:'nowrap',
     width:'20%'
},
[theme.breakpoints.down('md')]:{
    button:{
        fontSize:13,
        padding:'10px',
        width:'40%'
    }
},
[theme.breakpoints.down('sm')]:{
    button:{
        padding:'10px',
        fontSize:13,
        width:'40%'
    }
},
}));
const UpdatePage = () => {
  const classes=useStyles();
    const {id}=useParams();
    const navigate=useNavigate();
    const {setAlert} = useContext(quizcontext);
    const [newcategory,setNewcategory]=useState(" ");
    const [options,setOptions]=useState([""]);
    const [question,setQuestion]=useState({
        questiontitle:"",
category:"",
difficultylevel:"",
option1:"",
option2:"",
option3:"",
option4:"",
rightanswer:""
    });
    const [updatequestion,setUpdatequestion]=useState({
 questiontitle:"",
category:"",
difficultylevel:"",
option1:"",
option2:"",
option3:"",
option4:"",
rightanswer:"",
    });
    useEffect(()=>{
   const fetchQuestion=async()=>{
    try{
    const response=await getQuestionById(id);
    setQuestion(response);
    
    }
    catch(error){
        console.log(error);
    }
   }
   fetchQuestion();
    },[id])
    useEffect(() => {
        if (question && Object.keys(question).length > 0) {
            setUpdatequestion(question); 
        }
    }, [question]);
    useEffect(()=>{
    fetchCategories();
    },[])
    const fetchCategories=async()=>{
    try{
    const options=await getCategories();
    setOptions(options);
    }
    catch(error){
    console.error(error);
    }
    }
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setUpdatequestion({...updatequestion,[name]:value});
        if (name === "category" && value !== "New") {
            setNewcategory(""); // Reset new category value when not in "New" mode
          }
       
    }
    const handleNewCategoryChange = (e) => {
        const {name,value}=e.target;
        setNewcategory(e.target.value); // Update the new category value while typing
        
      };
    const handleSubmit=async(e)=>{
    e.preventDefault();
    if (updatequestion.category === "New" && newcategory) {
        updatequestion.category = newcategory;
      }
    // const formData=new FormData();
    // formData.append(
    //     "question",
    //     new Blob([JSON.stringify(question)], { type: "application/json" })
    //   );
      try{
      const response=await updateQuestion(id,updatequestion);
      setAlert({
        open:true,
        message:'Question updated successfully',
        type:'success'
      });
      navigate(-1);
      }
      catch(error){
        console.error(error);
       
      }
    }
  return (
    <div>
      <Box p={5} style={{backgroundColor:'rgb(255, 255, 255)',display:'flex',flexDirection:'column',gap:'20px'}}>
        <TextField type="text" variant="outlined" fullWidth placeholder={question.questiontitle} label="Question title" name="questiontitle" value={updatequestion.questiontitle} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder={question.difficultylevel} label="Difficulty level" name="difficultylevel" value={updatequestion.difficultylevel} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder={question.option1} label="Option 1" name="option1" value={updatequestion.option1} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder={question.option2} label="Option 2" name="option2" value={updatequestion.option2} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder= {question.option3}label="Option 3" name="option3" value={updatequestion.option3} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder={question.option4} label="Option 4" name="option4" value={updatequestion.option4} onChange={handleInputChange}>

        </TextField>
       
        <TextField type="text" variant="outlined" fullWidth placeholder={question.rightanswer} label="Correct answer" name="rightanswer" value={updatequestion.rightanswer} onChange={handleInputChange}>

        </TextField>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="category"
          id="demo-simple-select"
          value={updatequestion.category}
          onChange={handleInputChange}
        >
          <MenuItem value={question.category}>{question.category}</MenuItem>
          <MenuItem value="New">Add New Category</MenuItem>
          {options?.map((option)=>{
             return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
          })}
        </Select>
        </FormControl>
        {question.category === "New" && (
  <TextField
    type="text"
    label="New Category"
    variant="outlined"
    fullWidth
    placeholder="Enter category name"
    name="category"
    value={newcategory}
    onChange={handleNewCategoryChange}
  />
)}
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Save Changes</Button>
    </Box>     
    </div>
  )
}

export default UpdatePage
