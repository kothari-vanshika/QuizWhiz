import React, { useContext ,useState,useEffect} from 'react'
import UserHeader from '../components/UserHeader';
import {Button,Box,Table,TableContainer,IconButton,TableRow,TableHead,TableBody,TableCell,Chip,makeStyles,Container,Paper,TextField,Typography,LinearProgress} from '@material-ui/core';
import { getQuizzes } from '../utils/QuizService';
import Pagination from "@material-ui/lab/Pagination";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { quizcontext } from '../context/context';
import { onAuthStateChanged } from 'firebase/auth';
const useStyles = makeStyles({
  row: {
    backgroundColor: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(198, 197, 197)",
    },
    height:'30px',
    "& .MuiTableCell-root": {
      padding: "20px 20px", // Reduce padding inside TableCell
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "black",
    },
  },
});
const UserContent = () => {
  const classes = useStyles();
const history = useNavigate();
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState("");
// const {user}=useContext(quizcontext);
const [page, setPage] = useState(1);
const [quiz,setQuiz]=useState([{
  id:"",
  category:"",
  num:"",
  title:"",
  questions:[{
      id:"",
      category: "",
      difficultylevel: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      questiontitle: "",
      rightanswer:""
  }]
}]);
const [user,setUser]=useState(null);
 // Loading state to ensure Firebase user is resolved
 const [authLoading, setAuthLoading] = useState(true); // Add loading state

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
     if (user) {
       setUser(user);
     } else {
       setUser(null);
     }
     setAuthLoading(false); // Stop loading once Firebase authentication is complete
   });
   return () => unsubscribe(); // Cleanup on component unmount
 }, []);
useEffect(()=>{
  const fetchQuizzes=async()=>{
  try{
    setLoading(true);
    const data=await getQuizzes();
    setQuiz(data);
    console.log(data);
    setLoading(false);
  }
  catch(error){
    console.log(error);
  }
  }
  fetchQuizzes();
  },[])
const [sortOrder,setSortOrder]=useState("asc");
const handleSearch = () => {
  return quiz.filter(
    (q) =>
      q.title.toLowerCase().includes(search) ||
      q.category.toLowerCase().includes(search)
  );
};


const handleSort = () => {
  // Toggle sort order
  const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
  setSortOrder(newSortOrder);

  // Sort quizzes by category based on the current sort order
  const sortedQuiz = [...quiz].sort((a, b) => {
    if (newSortOrder === "asc") {
      return a.category.localeCompare(b.category);
    } else {
      return b.category.localeCompare(a.category);
    }
  });

  setQuiz(sortedQuiz); // Update quiz state with sorted data
};
if (authLoading || loading) {
  return <LinearProgress />;
}
  return (
    <div>
      
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
        List Of Quizzes Available
        </Typography>
        <TextField
          label="Search For a Quiz..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "black" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "white" }}>
                <TableRow>
                  {["Title", "Number of Questions", "Category",""].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                       fontSize:'20px'
                      }}
                      key={head}
                      align={head === "Title" ? "" : "right"}
                    >
                      {head === "Category" ? (
                      <span onClick={handleSort} style={{ cursor: "pointer" }}>
                        Category <IconButton onClick={handleSort}>
              {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconButton>
                      </span>
                    ) : (
                      head
                    )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 5, (page - 1) * 5 + 5)
                  .map((row) => {
                    {!user && (<div>Loading..</div>)}
                     const key=`${user?.uid}_quizAttempted_${row.id}`
                    return (
                      <TableRow
                        className={classes.row}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          
                        >
                            <span style={{ fontFamily:'Montserrat',fontSize:'20px', color: "black" }}>
                              {row.title}
                            </span>
                        </TableCell>
                        <TableCell align="right" style={{fontFamily:'Montserrat',fontSize:'20px',color:'black'}}>
                          {row.num}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: 'black',
                            fontFamily:'Montserrat',fontSize:'20px'
                          }}
                        >
                         
                          
                          <Chip
                                label={row.category}
                                style={{ fontFamily:'Montserrat',backgroundColor: '#8CDC71', color: 'black',fontSize:'20px' }}
                            />
                         
                         
                          
                          
                        </TableCell>
                        <TableCell align="right">
                          <div style={{display:'inline-flex',alignItems:'center'}}>
                          {localStorage.getItem(key)==="true"?<CheckCircleIcon fontSize='medium' style={{marginRight:'8px'}}/>:""}
                          <Button variant="contained" color='primary' style={{width:'20%',marginRight:'10px'}} onClick={()=>history(`/user/take/${row.id}`)}>Start</Button>
                        
                          </div>
                  
                        
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 5).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 0);
          }}
        />
      </Container>
    </div>
  )
}

export default UserContent
