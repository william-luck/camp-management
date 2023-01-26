import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link, } from 'react-router-dom'

import { useState } from "react";


function NavBar({ location }) {
    
    
    return (
        <>
        <Nav fill className="flex-column" variant="pills" defaultActiveKey="/home" activeKey={location.pathname}>
        <Nav.Item>
        <Nav.Link to="/home" as={Link} eventKey="/home">Distrisbute to HHs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link to='/edit-hhs' as={Link} eventKey="/edit-hhs">Edit HHs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link to='/add-new-hh' eventKey={'/add-new-hh'} as={Link}>New HH arrival</Nav.Link>
        </Nav.Item>
        </Nav>
        </>
    )
}

export default NavBar;

