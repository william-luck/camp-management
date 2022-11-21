import React from "react";
import Login from "./Login";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";


function App() {

  const [user, setUser] = useState('')

  // Checks if already logged-in user on page load
  useEffect(() => {
    fetch('/me').then(response => {
      if (response.ok) {
        response.json().then(user => setUser(user))
      } 
    })
  }, [])

  if (!user) return <Login setUser={setUser} />

  return (
   <>
    Succesfully Logged In
   
   </> 
  )
}

export default App;
