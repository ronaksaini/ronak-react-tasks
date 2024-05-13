import React from 'react'
import Login from './components/Task6/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Signup from './components/Task6/Signup'
// import Profile from './components/Task6/Profile'
import ToDoList from './components/Task6/ToDoList'
const App = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/to-do-list' exact element={<ToDoList/>}/>
            </Routes>
        </Router>
        
    </div>
  )
}

export default App
