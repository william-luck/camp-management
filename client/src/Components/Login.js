import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState } from "react";



function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([])
    const [user, setUser] = useState('')


    function handleSubmit(e) {
        // Prevent refresh
        e.preventDefault()
        
        // Post request to /login, returns the camp manager as JSON
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        // sets state of logged in user (camp manager) if the request was succesful
        // if not, returns error as JSON ('invalid username or password') when wrong credentials 
        }).then(response => {
            if (response.ok) {
                response.json().then(user => setUser(user))
            } else {
                response.json().then(errors => setErrors(errors.errors))
            }
        })
    }


    return (
        <>
        <Container>
        <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Container>

        </>
    )
}

export default Login;

