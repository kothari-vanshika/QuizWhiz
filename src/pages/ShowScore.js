import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { getQuestionsAdmin } from '../utils/QuizService';
import { useNavigate } from 'react-router-dom';
import { Button,Radio,RadioGroup,FormControlLabel,Box,Card,Typography,CardContent,Chip, makeStyles} from '@material-ui/core';
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
    fontSize:'20px',
    marginBottom:'15px'
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
const ShowScore = () => {
  const classes=useStyles();
  const navigate=useNavigate();
    const location=useLocation();
    const {id}=useParams();
    const {score,response}=location.state;
    const [questions,setQuestions]=useState([{
      id:"",
      category:"",
      questiontitle:"",
      difficultylevel:"",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      rightanswer:""
    }]);
    useEffect(()=>{
    const fetchQuestion=async()=>{
    try{
      const data=await getQuestionsAdmin(id);
      setQuestions(data);
      console.log(data);
      console.log(response);
    }
    catch(error){
      console.error(error);
    }
    }
    fetchQuestion();
    },[])
    const totalQuestions=questions.length;
  return (
    <Box p={3} style={{display:'flex',flexDirection:'column', gap:'20px'}}>
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
              color: "#4CAF50",
              marginBottom: "10px",
              fontFamily: "Montserrat",
            }}
          >
            Your Score: {score}
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "#555", fontFamily: "Montserrat" }}
          >
            Correct Answers: {score} / {totalQuestions}
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "#555", fontFamily: "Montserrat" }}
          >
            Attempted: {response.length} / {totalQuestions}
          </Typography>
        </CardContent>
      </Card>
    {questions?.map((question, i) => (
                    <Card key={question.id} style={{ padding: '15px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Box style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
                            <Typography variant="h6" gutterBottom  className={classes.question}>
                                {`${i + 1}. ${question.questiontitle}`}
                            </Typography>
                            <Box className={classes.box}>
                            <Chip
                                label={question.category}
                               className={classes.chip}
                            />
                             <Chip
                                label={question.difficultylevel}
                                className={classes.chips}
                            />
                            </Box>
                            </Box>
                            <RadioGroup>
              {[
                question.option1,
                question.option2,
                question.option3,
                question.option4,
              ].map((option, index) => {
                
                const userAnswer = response.find((a) => a.id === question.id);
                let backgroundColor = "";
                if (option === question.rightanswer) {
                  backgroundColor = "rgb(206, 232, 160)"; 
                }
                if (
                  userAnswer &&
                  userAnswer.response === option &&
                  option !== question.rightanswer
                ) {
                  backgroundColor = "#e99e9e"; 
                }

                return (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={
                      <Radio
                      color='grey'
                        checked={option === userAnswer?.response}
                        style={{
                          pointerEvents: "none", // Disable interaction
                        }}
                      />
                    }
                    label={option}
                    style={{
                      backgroundColor: backgroundColor,
                      padding: "10px",
                      borderRadius: "5px",
                     
                      marginBottom: "5px",
                    }}
                  />
                );
              })}
            </RadioGroup>
            </CardContent>
              </Card>
                          )
                        )}
                      <Box mt={2}>
                         <Button variant="contained" color="primary" onClick={()=>navigate(-1)}>Back</Button>
                        </Box>
              </Box>
                        
  )
}

export default ShowScore
