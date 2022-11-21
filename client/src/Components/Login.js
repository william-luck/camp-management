import React, { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState, UseEffect } from "react";
import Alert from 'react-bootstrap/Alert';




function Login({ setUser}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([])
    
    
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
                setErrors([])
            } else {
                response.json().then(errors => setErrors(errors.errors))
            }
        })
    }

    function errorMessage() {
        <Alert variant="danger" onClose={() => setErrors('')} dismissible>{errors}</Alert>

    }


    return (
        <>
        <Container>
        <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            {errors.map(error => <Alert key={error} variant="danger" onClose={() => setErrors([])} dismissible>{error}</Alert>)}

            <Button variant="primary" type="submit">
                Submit
            </Button>

            

            
        </Form>
        </Container>

        </>
    )
}

export default Login;

