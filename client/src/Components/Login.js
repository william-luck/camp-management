import React, { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState, UseEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import SignUpForm from "./SignUpForm";




function Login({ setUser}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([])

    const [showLogin, setShowLogin] = useState(true)
    
    
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




    return (
        <>
        <Container>
        <div style={{display: 'inline-block'}}><h3>{showLogin ? 'Log in' : 'Sign up'}</h3></div>
        {' '}
        {!showLogin ? <Button variant="link" size="sm" style={{display: 'inline-block'}} onClick={() => setShowLogin(true)}>Back to Login </Button> : null}
        {showLogin ? 
             <Form onSubmit={e => handleSubmit(e)}>
             <Form.Group className="mb-3">
                 <Form.Label>Username</Form.Label>
                 <Form.Control type="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
             </Form.Group>
     
             <Form.Group className="mb-3">
                 <Form.Label>Password</Form.Label>
                 <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
             </Form.Group>
 
             {errors.map(error => <Alert key={error} variant="danger" onClose={() => setErrors([])} dismissible>{error}</Alert>)}
 
             <Button variant="primary" type="submit" style={{display: 'inline-block'}}>
                 Submit
             </Button>
 
             {' '}
             <span>
                 No account? 
                 <Button variant="link" onClick={() => setShowLogin(false)}>Sign up</Button>
             </span>
            </Form>
        : 
           <SignUpForm setUser={setUser}/>
        }
       
        </Container>

        </>
    )
}

export default Login;

