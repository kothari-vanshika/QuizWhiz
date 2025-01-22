import React, { useState,useEffect, useContext } from 'react'
import {Typography,Button,Box,Card,CardContent,RadioGroup,Radio,FormControl,FormControlLabel ,Chip, makeStyles} from '@material-ui/core'
import { useParams } from 'react-router-dom';
import { getQuestions,calc } from '../utils/QuizService';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import UserHeader from '../components/UserHeader';
import { quizcontext } from '../context/context';
const useStyles=makeStyles((theme)=>({
question:{
  flexGrow:1,
  wordWrap:'break-word',
  fontFamily:'Montserrat',
  fontSize:20
},
box:{
  display:'flex',
   width:'100%',
   gap:'10px', 
   justifyContent:'flex-end'
},
chips:{
  backgroundColor:'rgb(246, 161, 92)' ,
  color: 'white', 
  fontWeight: 'bold' ,
  fontFamily:'Montserrat',
  fontSize:'20px'
},
chip:{
  backgroundColor: '#8CDC71', 
  color: 'white', 
  fontWeight: 'bold' ,
  fontFamily:'Montserrat',
  fontSize:'20px'
},

[theme.breakpoints.down('md')]:{
  question:{
 fontSize:16
  },
  chip:{fontSize:'16px'},
  chips:{fontSize:'16px'},
  box:{
    justifyContent:'flex-start'
  }
},

[theme.breakpoints.down('sm')]:{
  question:{
    fontSize:14
     },
     chip:{fontSize:'14px'},
     chips:{fontSize:'14px'},
     box:{
      justifyContent:'flex-start'
    }
}
}));
const PlayQuiz = () => {
  const classes=useStyles();
    const navigate=useNavigate();
    const [hasAttempted,setHasAttempted]=useState(false);
    const [responses,setResponses]=useState([]);
    const {user}=useContext(quizcontext);
    const [questions,setQuestions]=useState([{
    id:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    questionTitle:"",
    category:"",
    difficultylevel:""
    }]);
    const {id}=useParams();
    useEffect(() => {
      const hasAttempted = localStorage.getItem(key) === 'true';
      setHasAttempted(hasAttempted);
    }, []);
    useEffect(()=>{
    const fetchQuestionsForQuiz=async()=>{
        try{
        const response=await getQuestions(id);
        console.log(response);
        setQuestions(response);
        }
        catch(error){
            console.error(error);
        }
    }
    fetchQuestionsForQuiz();
    
    },[id])
   
    console.log(user.uid);
    const key=`${user.uid}_quizAttempted_${id}`;
    useEffect(() => {
      const hasAttempted = localStorage.getItem(key) === 'true';
      setHasAttempted(hasAttempted);
    }, []);
    if (!user) {
      return <div>Loading...</div>; // Or redirect to login
    }
    const handleChange=(id,selectedoption)=>{
     setResponses((prev)=>{
        const existingIndex=prev.findIndex((res)=>res.id===id);
        if(existingIndex!==-1){
       const updated=[...prev];
       updated[existingIndex]={id,response:selectedoption};
       return updated;
        }
        else
        return [...prev,{id,response:selectedoption}]
     })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        localStorage.setItem(key,true);
        try{
        console.log(responses);
        const score=await calc(id,JSON.stringify(responses));
        console.log(score);
       navigate(`/user/showscore/${id}`,{ state: { 
        response: responses,
        score
     } });
        }
        catch(error){
         console.error(error);
        }
    }
  
if(hasAttempted){
    return(
        <Box>
<Card
                style={{
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent style={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "bold",
                      color: "rgb(214, 82, 82)",
                      marginBottom: "10px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    You have attempted the quiz!
                  </Typography>
                  </CardContent>
                  </Card>
                  <Box p={2}>
                  <Button variant="contained" color="primary" onClick={()=>navigate(-1)}>Back</Button>
                  </Box>
        </Box>
        
    )
}
return (
   <Box p={3} style={{display:'flex',flexDirection:'column', gap:'20px'}}>
    {questions?.map((question, i) => (
                    <Card key={question.id} style={{ padding: '15px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Box style={{display:'flex',width:'100%', flexWrap:'wrap'}}>
                            <Typography gutterBottom className={classes.questiontitle}>
                                {`${i + 1}. ${question.questionTitle}`}
                            </Typography>
                            <Box className={classes.box}>
                            <Chip className={classes.chip}
                                label={question.category}
                                
                            />
                             <Chip
                                label={question.difficultylevel}
                               className={classes.chips}
                            />
                            </Box>
                            </Box>
                            <FormControl component="fieldset">
                                <RadioGroup  name={`question-${question.id}`}
                onChange={(e) => handleChange(question.id, e.target.value)}>
                    {[question.option1,question.option2,question.option3,question.option4].map((option,index)=>(
                      <FormControlLabel  key={index} value={option} control={<Radio />} label={option} />
                    ))}
                                  
                    </RadioGroup>
                    </FormControl>
                            </CardContent>
                            </Card>
                        ))}
                        <Box mt={2}>
                         <Button variant="contained" color="primary" onClick={handleSubmit}>End Quiz</Button>
                        </Box>
                     </Box>
)}


export default PlayQuiz
