import React, { useEffect, useState ,useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { getQuizzes } from "../utils/QuizService";
import { quizcontext } from "../context/context";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {
  Container,
  TableCell,
  IconButton,
  Chip,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Button
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";



export default function ShowQuiz() {
    
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
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
const [sortOrder,setSortOrder]=useState("asc");
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

  const classes = useStyles();
  const history = useNavigate();
  const handleSearch = () => {
    return quiz.filter(
      (q) =>
        q.title.toLowerCase().includes(search) ||
        q.category.toLowerCase().includes(search)
    );
  };

  return (
    
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
                    return (
                      <TableRow
                        onClick={() => history(`/admin/show/${row.id}`,{ state: { questions: row.questions } })}
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
                          <Button variant="contained" color='primary' style={{width:'20%',marginRight:'10px'}} onClick={()=>history(`/admin/show/${row.id}`,{ state: { questions: row.questions } })}>View</Button>
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
  
  );
}

