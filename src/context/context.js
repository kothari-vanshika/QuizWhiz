import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import {auth} from '../firebase';
import { createContext} from "react";
import { useEffect ,useState} from "react";
const quizcontext=createContext();
const Provider=({children})=>{
const[alert,setAlert]=React.useState({
open:false,
message:'',
type:''
});
const [user,setUser]=React.useState(null);
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
const valueToShare={
    alert,
    setAlert,
    user
};
return(
<quizcontext.Provider value={valueToShare}>{children}</quizcontext.Provider>
);
}
export {Provider,quizcontext};

