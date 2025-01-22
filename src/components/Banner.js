import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core';
import TypingEffect from './Typing';
const useStyles= makeStyles((theme)=>({
banner:{
  top:'0',
width:"100%",
height:'100vh',
backgroundImage:"url('/Quiz background.png')",
backgroundSize:'100% 100%' ,
backgroundRepeat:'no-repeat',
backgroundPosition:'center',
position: 'relative',
display:'flex',
justifyContent:'center',
alignItems:'center'
},
content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',  // Vertically center content inside the container
      alignItems: 'center',      // Horizontally center content inside the container
      height: '100%',            // Ensure content container takes up the full height
      padding: '0 20px',         // Optional padding for better spacing
      boxSizing: 'border-box',
      width: '100%',
    },
    tagline: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: '20px', // Reduce margin-top for smaller screens to ensure it stays within bounds
      padding: '0 20px',  // Prevent text from touching edges
      maxWidth: '100%',
      width: '100%',
    },
    typography: {
      fontSize: '2.5rem',  // Default font size for larger screens
      lineHeight: '1.4',    // Add space between lines
      color: 'white',
      transition: 'color 0.3s, text-shadow 0.3s',
      padding: '0',        // Remove padding to prevent overflow
      margin: '0',         // Remove margin to prevent text from overflowing
  
      [theme.breakpoints.down('md')]: {  // For screens smaller than 768px
        fontSize: '1.5rem', // Adjust font size for medium devices (tablets)
        marginTop: '100px', // Reduce margin-top for better fitting on tablets
      },
      [theme.breakpoints.down('sm')]: {  // For screens smaller than 480px
        fontSize: '1.5rem', // Smaller font size for smaller devices (phones)
        marginTop: '80px', // Further reduce margin-top on small screens
      },
    },

}));
const Banner = () => {
  const classes=useStyles();
  return (
    <div className={classes.banner}> 
      <Container className={classes.content}>
        <div className={classes.tagline}>
        <Typography className={classes.typography}>
         <TypingEffect/>
      </Typography>
        </div>
      </Container>
    </div>
  )
}

export default Banner


// import React from 'react';
// import { Container, makeStyles, Typography } from '@material-ui/core';
// import TypingEffect from './Typing';

// const useStyles = makeStyles((theme) => ({
//   banner: {
//     top: '0',
//     width: '100%',
//     height: '100vh', // Ensure the banner always fills the full viewport height
//     backgroundImage: "url('/Quiz background.png')",
//     backgroundSize: 'cover',  // Ensures the background image covers the entire banner area
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',  // Horizontally center content
//     alignItems: 'center',       // Vertically center content inside the banner
//   },
//   content: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',  // Vertically center content inside the container
//     alignItems: 'center',      // Horizontally center content inside the container
//     height: '100%',            // Ensure content container takes up the full height
//     padding: '0 20px',         // Optional padding for better spacing
//     boxSizing: 'border-box',
//     width: '100%',
//   },
//   tagline: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     textAlign: 'center',
//     marginTop: '20px', // Reduce margin-top for smaller screens to ensure it stays within bounds
//     padding: '0 20px',  // Prevent text from touching edges
//     maxWidth: '100%',
//     width: '100%',
//   },
//   typography: {
//     fontSize: '2.5rem',  // Default font size for larger screens
//     lineHeight: '1.4',    // Add space between lines
//     color: 'white',
//     transition: 'color 0.3s, text-shadow 0.3s',
//     padding: '0',        // Remove padding to prevent overflow
//     margin: '0',         // Remove margin to prevent text from overflowing

//     // Media queries for responsiveness
//     [theme.breakpoints.down('md')]: {  // For screens smaller than 768px
//       fontSize: '2rem', // Adjust font size for medium devices (tablets)
//       marginTop: '100px', // Reduce margin-top for better fitting on tablets
//     },
//     [theme.breakpoints.down('sm')]: {  // For screens smaller than 480px
//       fontSize: '1.5rem', // Smaller font size for smaller devices (phones)
//       marginTop: '80px', // Further reduce margin-top on small screens
//     },
//   },
// }));

// const Banner = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.banner}>
//       <Container className={classes.content}>
//         <div className={classes.tagline}>
//           <Typography variant="h4" className={classes.typography}>
//             <TypingEffect />
//           </Typography>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Banner;
