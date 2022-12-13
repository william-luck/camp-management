import React from "react";
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";


function UserInformation({ user, setUser }) {

    function handleLogout() {

        fetch('/logout', {
            method: 'DELETE'
        })
            .then(() => setUser(null))

    }


    return (
        <>
        <Container>
        <Card>
            <Card.Body>
                <Card.Title>Logged in</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">as Camp Manager</Card.Subtitle>
                <Card.Text>{user.email}</Card.Text>
                <Card.Text>IDP camp, {user.district}, {user.governorate}</Card.Text>
                <Button variant="link" onClick={handleLogout}>Logout</Button>
            </Card.Body>
        </Card>
        </Container>
        

        </>
    )
}

export default UserInformation;