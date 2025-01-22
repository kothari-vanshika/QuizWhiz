// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { Box ,Modal,Fade,Backdrop,Tabs,Tab} from '@material-ui/core';
// import AuthModal from './Authentication/AuthModal'
// import { quizcontext } from '../context/context';
// import UserSidebar from './Authentication/UserSidebar';
// import AdminForm from './Authentication/AdminForm';
// const useStyles = makeStyles((theme) => ({
//   title: {
//     fontSize: 30,
//     fontFamily: 'Montserrat',
//     fontWeight: 'bold',
//     color: 'white',
//     flexGrow: 1, // Ensures the title takes available space and aligns other content
//   },
//   container: {
//     backgroundColor: 'black',
//   },
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: 10,
//   },
//   adminButton: {
//     cursor: 'pointer',
//     backgroundColor: 'transparent',
//     border: 'none',
//     marginLeft: '30px',
//     color: 'white',
//     fontFamily: 'Montserrat',
//     fontSize: 20,
//   },
//   userControls: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//   },
//   viewQuizzesButton: {
//     color: 'white',
//     fontFamily: 'Montserrat',
//     fontSize: 20,
//     marginLeft: '30px',
//   },
//   loginButton: {
//     color: 'white',
//     fontFamily: 'Montserrat',
//     fontSize: 20,
//     marginLeft: '30px',
//   },
//   // Breakpoints for different screen sizes
//   [theme.breakpoints.down('sm')]: {
//     title: {
//       fontSize: '20px', // Reducing title size for mobile
//     },
//     userControls: {
//       flexDirection: 'column', // Stacks the user controls vertically on smaller screens
//       alignItems: 'center', // Centers the buttons on mobile
//     },
//     loginButton: {
//       marginBottom: '10px', // Adds space between buttons for smaller screens
//     },
//     viewQuizzesButton: {
//       marginBottom: '10px',
//     },
//   },
//   [theme.breakpoints.down('xs')]: {
//     title: {
//       fontSize: '18px', // Further reduce font size for very small screens
//     },
//     adminButton: {
//       fontSize: '18px', // Adjust admin button font size for mobile
//     },
//     viewQuizzesButton: {
//       fontSize: '18px', // Adjust the "View Quizzes" button size for mobile
//     },
//     loginButton: {
//       fontSize: '18px', // Adjust the "Login" button size for mobile
//     },
//   },
// }));
// export default function Navbar() {
//   const {user}=useContext(quizcontext);
//   const [open, setOpen] = React.useState(false);
//   const [value,setValue]=React.useState(0);
//   const classes = useStyles();
//   const navigate=useNavigate();
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   return (
//     <div>
//     <div className={classes.container}>
//       <AppBar color="transparent" position="static">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             QuizWhiz
//           </Typography>
//           <div>
//       <button type="button" onClick={handleOpen} className={classes.adminButton}>
//         ADMIN
//       </button>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <div className={classes.paper}>
//           <AppBar position="static" style={{backgroundColor:'black',color:'white'}}>
//           <Tabs value={value} onChange={handleChange} variant="fullWidth" style={{borderRadius:10}}>
//     <Tab label="Admin Form" style={{fontWeight:"bold"}} />
//   </Tabs>
//       </AppBar> 
//       {value===0 && <AdminForm handleClose={handleClose}/>} 
//           </div>
//         </Fade>
//       </Modal>
//     </div>
//          {!user && <AuthModal/>}
//          {user && (
//           <div
//           className={classes.userControls}
//         >
//           <Button
//             className={classes.viewQuizzesButton}
//             onClick={() => navigate("/user/take")}
//           >
//             View Quizzes
//           </Button>
//           <Box style={{display:'flex',marginLeft:'900px'}}>
//             <UserSidebar />
//           </Box>
//         </div>
//         )}
//         </Toolbar>
//       </AppBar>
//     </div>
//     </div>
//   );
// }
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box, Modal, Fade, Backdrop, Tabs, Tab } from '@material-ui/core';
import AuthModal from './Authentication/AuthModal';
import { quizcontext } from '../context/context';
import UserSidebar from './Authentication/UserSidebar';
import AdminForm from './Authentication/AdminForm';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: 'white',
    flexGrow: 1, // Ensures the title takes available space and aligns other content
  },
  container: {
    backgroundColor: 'black',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
  },
  adminButton: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    marginLeft: '30px',
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 20,
  },
  userSidebox: {
    display: 'flex',
    justifyContent: 'flex-end', // Aligning the sidebar to the right
    alignItems: 'center',
    width: 'auto', // Sidebar box width should be auto to not restrict its size
    flexGrow:1
  },
  userControls: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  viewQuizzesButton: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginLeft:'30px'
  },
 
  // Mobile responsiveness for small screens
  [theme.breakpoints.down('sm')]: {
    title: {
      fontSize: '20px', // Reducing title size for mobile
    },
    userControls: {
      display: 'flex',
      justifyContent: 'flex-end', // Aligning everything to the right on mobile
      width: '100%',
    },
    adminButton: {
      fontSize: '18px', // Adjust admin button font size for mobile
    },
    viewQuizzesButton: {
      fontSize: '18px', // Adjust the "View Quizzes" button size for mobile
    },
 
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      fontSize: '18px', // Further reduce font size for very small screens
    },
    adminButton: {
      fontSize: '16px', // Further reduce the font size for the Admin button
    },
    viewQuizzesButton: {
      fontSize: '16px', // Further reduce font size for the "View Quizzes" button
    },
    
  },
}));

export default function Navbar() {
  const { user } = useContext(quizcontext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <div className={classes.container}>
      <AppBar color="transparent" position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            QuizWhiz
          </Typography>

          
            <Button onClick={handleOpen} className={classes.adminButton}>
              ADMIN
            </Button>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <AppBar position="static" style={{ backgroundColor: 'black', color: 'white' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    style={{ borderRadius: 10 }}
                  >
                    <Tab label="Admin Form" style={{ fontWeight: 'bold' }} />
                  </Tabs>
                </AppBar>
                {value === 0 && <AdminForm handleClose={handleClose} />}
              </div>
            </Fade>
          </Modal>

          {!user && <AuthModal />}

          {user && (
            <div className={classes.userControls}>
             
              <Button
                className={classes.viewQuizzesButton}
                onClick={() => navigate('/user/take')}
              >
                View Quizzes
              </Button>
              <Box className={classes.userSidebox}>
                <UserSidebar />
              </Box>
            </div>
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
}

