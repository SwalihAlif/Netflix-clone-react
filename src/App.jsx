import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Firestore instance

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");

        let name = user.displayName;
        if (!name) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          name = userDoc.exists() ? userDoc.data().name : "Unknown User";
        }
        console.log("User Name: ", name)
        

        navigate('/');
      } else {
        console.log("Logged out");
        navigate('/login'); 
      }
    })

  }, [navigate])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
      
      
    </div>
  )
}

export default App
