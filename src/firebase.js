import { initializeApp } from 'firebase/app';
import {firebaseConfig} from './config/firebaseConfig' ;
import { getAuth } from 'firebase/auth';
const app=initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);
const auth=getAuth(app);
console.log("Auth got",auth);
export {auth};
