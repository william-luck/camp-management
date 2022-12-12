import React from "react";
import { useState, useEffect } from "react";

import Login from "./Login";
import UserInformation from "./UserInformation";
import HouseholdList from "./HouseholdList";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Route, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import EditHouseholds from "./EditHouseholds";
import NewHousehold from "./NewHousehold";


function App() {

  const [user, setUser] = useState('')
  const [households, setHouseholds] = useState([])
  const [newHousehold, setNewHousehold] = useState(false)
  const location = useLocation();

  // Checks if already logged-in user on page load
  useEffect(() => {
    fetch('/me').then(response => {
      if (response.ok) {
        response.json().then(user => setUser(user))
        fetch('/households')
            .then(r => r.json())
            .then(households => setHouseholds(households))
      } 
    })
  }, [])

  if (!user) return <Login setUser={setUser} />

  return (
   <>


    <Container>
      <Row>
        <Col xs={4}>
          <UserInformation user={user}/>
          <br></br>
          <NavBar/>
        </Col>
        <Col>
          <Route exact path='/'>
            <HouseholdList households={households} setHouseholds={setHouseholds}/>
          </Route>
          <Route path='/edit-hhs'>
            <EditHouseholds households={households} location={location}/>
          </Route>
          <Route path='/add-new-hh'>
            <NewHousehold setNewHousehold={setNewHousehold} location={location}/>
          </Route>
        </Col>
      </Row>
    </Container>

   
   </> 
  )
}

export default App;
