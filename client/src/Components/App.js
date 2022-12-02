import React from "react";
import { useState, useEffect } from "react";

import Login from "./Login";
import UserInformation from "./UserInformation";
import HouseholdList from "./HouseholdList";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./NavBar";
import EditHouseholds from "./EditHouseholds";


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
    {/* Succesfully Logged In */}
    {/* Grid System */}
    {/* User info */}
    {/* Nav bar */}
    {/* HH list with nested HH card */}

    <Container>
      <Row>
        <Col xs={4}>
          <UserInformation user={user}/>
          <br></br>
          <NavBar/>
        </Col>
        <Col>
          <Route exact path='/'>
            <HouseholdList/>
          </Route>
          <Route path='/edit-hhs'>
            <EditHouseholds/>
          </Route>
        </Col>
      </Row>
    </Container>

   
   </> 
  )
}

export default App;
