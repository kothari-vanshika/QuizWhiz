import React, { useContext, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { quizcontext } from '../context/context';
import { Box ,Button,Typography,Card,CardContent,TextField,ListItem,Chip,List, makeStyles} from '@material-ui/core';
import { getAllQuestions , deleteQuestion} from '../utils/QuestionService';
const useStyles=makeStyles((theme)=>({
button:{
    fontSize:14,
     padding:'8px',
     whiteSpace:'nowrap'
},
[theme.breakpoints.down('md')]:{
    button:{
        fontSize:13,
        padding:'10px',
        
    }
},
[theme.breakpoints.down('sm')]:{
    button:{
        padding:'10px',
        fontSize:13
    }
},
}));
const ShowQuestions = () => {
    const classes=useStyles();
    const {setAlert} =useContext(quizcontext);
    const navigate=useNavigate();
    const [search,setSearch]=useState("");
    const [questions,setQuestions]=useState([{
   id:"",
   questiontitle:"",
   option1:"",
   option2:"",
   option3:"",
   option4:"",
   rightanswer:""
    }]);
    //const [isQuestionDeleted,setIsQuestionDeleted]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    useEffect(()=>{
       fetchAllQuestions();
    },[])
    const fetchAllQuestions=async()=>{
        try{
        const response=await getAllQuestions();
        setQuestions(response);
        setIsLoading(false);
        }
        catch(error){
            console.error(error);
        }
    }
    const handleDelete=async(id)=>{
        try {
          const message= await deleteQuestion(id);
          setQuestions(questions.filter((question)=>question.id!==id));
          if(message==="success")
            setAlert({
          open:true,
          message:"Question Deleted successfully",
          type:"success"
        })
        } catch (error) {
            setAlert({
                open:true,
                message:"Error deleting question",
                type:"error"
              })
        }
    }
    if(isLoading)
        <p>Loading...</p>
    const handleSearch = () => {
        return questions.filter(
          (q) =>
            q.questiontitle.toLowerCase().includes(search) ||
            q.category.toLowerCase().includes(search)
        );
      };
  return (
    <Box p={5} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h4" gutterBottom>
                All Quiz Questions
            </Typography>
            <TextField
              label="Search For a Question..."
              variant="outlined"
              style={{ marginBottom: 20, width: "100%" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            {handleSearch(search).map((question, i) => (
                <Card key={question.id} style={{ padding: '15px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {`${i + 1}. ${question.questiontitle}`}
                        </Typography>
                        <List>
                            <ListItem>{question.option1}</ListItem>
                            <ListItem>{question.option2}</ListItem>
                            <ListItem>{question.option3}</ListItem>
                            <ListItem>{question.option4}</ListItem>
                        </List>
                        <Box mt={2}>
                            <Chip
                                label={`Correct answer: ${question.rightanswer}`}
                                style={{ backgroundColor: '#8CDC71', color: 'white', fontWeight: 'bold' }}
                            />
                        </Box>
                        <Box mt={2} style={{display:'flex',gap:'10px'}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={() => handleDelete(question.id)}
                            >
                                Delete Question
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/admin/update/${question.id}`)}
                                className={classes.button}
                            >
                                Update Question
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
  )
}

export default ShowQuestions
