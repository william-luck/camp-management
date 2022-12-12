import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link, } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'


function NavBar() {
    
    return (
        <>
        <Nav fill className="flex-column" variant="pills" defaultActiveKey="distribute">
        <Nav.Item>
        <Nav.Link to="/" as={Link} eventKey="distribute">Distrisbute to HHs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link to='/edit-hhs' as={Link} eventKey="edit">Edit HHs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link to='/add-new-hh' as={Link}>New HH arrival</Nav.Link>
        </Nav.Item>
        </Nav>
        </>
    )
}

export default NavBar;

