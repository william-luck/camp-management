import React from "react";
import Login from "./Login";
import Form from 'react-bootstrap/Form';
import { useState } from "react";


function App() {

  const [user, setUser] = useState('')

  return (
   <>
   {!user ? <Login setUser={setUser}/> : 'Successfully logged in'}
   
   </> 
  )
}

export default App;
