import React from 'react'
import { useLocation} from 'react-router-dom'
import { Box ,Button,Chip,Typography,Card,CardContent,List,ListItem} from '@material-ui/core';
const ShowQuizQuestion = () => {
    const location=useLocation();
    const questions=location.state?.questions || [];
  return (
    <Box p={5} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Quiz Questions
            </Typography>
            {questions?.map((question, i) => (
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
                        
                    </CardContent>
                </Card>
            ))}
        </Box>
  )
}

export default ShowQuizQuestion
