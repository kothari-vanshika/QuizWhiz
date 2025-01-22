import React from "react";
import { useState ,useEffect} from "react";
import { addQuestion ,getCategories} from "../utils/QuestionService";
import {Box,TextField,FormControl,InputLabel,Select,MenuItem,Button,makeStyles} from '@material-ui/core'
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
      width:'40%',
        padding:'10px',
        fontSize:13
    }
},
}));
const AddQuestion = () => {
  const classes=useStyles();
const [options,setOptions]=useState([""]);
const [newcategory,setNewcategory]=useState("");
const [question,setQuestion]=useState({
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
    setQuestion({...question,[name]:value});
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
if (question.category === "New" && newcategory) {
    question.category = newcategory;
  }
// const formData=new FormData();
// formData.append(
//     "question",
//     new Blob([JSON.stringify(question)], { type: "application/json" })
//   );
  try{
  const response=await addQuestion(question);
  
  }
  catch(error){
    console.error(error);
   
  }
}
  return (
    <div>
      <Box p={5} style={{backgroundColor:'rgb(255, 255, 255)',display:'flex',flexDirection:'column',gap:'20px'}}>
        <TextField type="text" variant="outlined" fullWidth placeholder="Enter the question" label="Question title" name="questiontitle" value={question.questiontitle} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder="eg.Easy,Medium,Hard" label="Difficulty level" name="difficultylevel" value={question.difficultylevel} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder="" label="Option 1" name="option1" value={question.option1} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder="" label="Option 2" name="option2" value={question.option2} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder="" label="Option 3" name="option3" value={question.option3} onChange={handleInputChange}>

        </TextField>
        <TextField type="text" variant="outlined" fullWidth placeholder="" label="Option 4" name="option4" value={question.option4} onChange={handleInputChange}>

        </TextField>
       
        <TextField type="text" variant="outlined" fullWidth placeholder="" label="Correct answer" name="rightanswer" value={question.rightanswer} onChange={handleInputChange}>

        </TextField>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="category"
          id="demo-simple-select"
          value={question.category}
          onChange={handleInputChange}
        >
          <MenuItem value="">Select a category</MenuItem>
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
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Create Question</Button>
    </Box>     
    </div>
  )
}

export default AddQuestion
