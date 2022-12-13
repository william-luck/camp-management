import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";


function SignUpForm({ setUser }) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [district, setDistrict] = useState('')
    const [governorate, setGovernorate] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [errors, setErrors] = useState([])


    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])

        fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              username,
              district,
              governorate,
              password,
              password_confirmation: passwordConfirm
            }),
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(user => setUser(user))
                } else {
                    r.json().then(err => setErrors(err.errors))
                }
            })


    }


    return (
        <>
         <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>District Name</Form.Label>
                <Form.Control placeholder="Enter district" value={district} onChange={e => setDistrict(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Governorate</Form.Label>
                <Form.Control placeholder="Enter governorate" value={governorate} onChange={e => setGovernorate(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">Signup</Button>
        </Form>
            </>
    )
}

export default SignUpForm;