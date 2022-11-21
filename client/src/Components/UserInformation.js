import React from "react";
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";


function UserInformation({ user }) {
    return (
        <>
        <Container>
        <Card>
            <Card.Body>
                <Card.Title>Logged in</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">as Camp Manager</Card.Subtitle>
                <Card.Text>{user.email}</Card.Text>
                <Card.Text>IDP camp, {user.district}, {user.governorate}</Card.Text>
            </Card.Body>
        </Card>
        </Container>
        

        </>
    )
}

export default UserInformation;