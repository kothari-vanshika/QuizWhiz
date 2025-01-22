import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Router,Routes } from 'react-router-dom'
import AlertBar from './components/AlertBar';
import Quizzes from './pages/Quizzes'
import UserPage from './pages/UserPage';
import UpdatePage from './pages/UpdatePage';
import AddQuestion from './components/AddQuestion';
import ShowQuestions from './components/ShowQuestions';
import PlayQuiz from './pages/PlayQuiz';
import CreateQuiz from './pages/CreateQuiz'
import ShowQuizQuestion from './pages/ShowQuizQuestion';
import UserHeader from './components/UserHeader';
import Navbaradmin from './components/Navbaradmin';
import ShowScore from './pages/ShowScore';
const App = () => {
  return (
    <BrowserRouter>
    <div>
        <Routes >
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/admin" element={<Quizzes/>}></Route>
        <Route path="/user/take" element={<UserPage/>}></Route>
        <Route path="/admin/update/:id" element={<div><Navbaradmin/><UpdatePage/></div>}></Route>
        <Route path="/admin/add" element={<div><Navbaradmin/><AddQuestion/></div>}></Route>
        <Route path="/admin/show" element={<div><Navbaradmin/><ShowQuestions/></div>}></Route>
        <Route path="/user/take/:id"element={<div><UserHeader/><PlayQuiz/></div>}></Route>
        <Route path="/admin/create"element={<div><Navbaradmin/><CreateQuiz/></div>}></Route>
        <Route path="/admin/show/:id"element={<div><Navbaradmin></Navbaradmin><ShowQuizQuestion/></div>}></Route>
        <Route path="/user/showscore/:id"element={<div><UserHeader/><ShowScore/></div>}></Route>
        </Routes>
        <AlertBar/>
    </div>
    </BrowserRouter>
  )
}

export default App
