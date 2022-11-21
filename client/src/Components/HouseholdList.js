import React from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";


function HouseholdList() {

    return (
        <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
        <Container>
        <Card>
            <Card.Body>
                <Card.Title>Household - Household ID</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">HH national ID number</Card.Subtitle>
                <Card.Text>HH members</Card.Text>
                <Card.Text>Funds in account</Card.Text>
            </Card.Body>
        </Card>
        <br></br>

        <Card>
            <Card.Body>
                <Card.Title>Logged in</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">as Camp Manager</Card.Subtitle>
                <Card.Text>email</Card.Text>
                <Card.Text>IDP camp, address</Card.Text>.
            </Card.Body>
        </Card>

        <br></br>

        <Card>
            <Card.Body>
                <Card.Title>Logged in</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">as Camp Manager</Card.Subtitle>
                <Card.Text>email</Card.Text>
                <Card.Text>IDP camp, address</Card.Text>.
            </Card.Body>
        </Card>

        <br></br>

        <Card>
            <Card.Body>
                <Card.Title>Logged in</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">as Camp Manager</Card.Subtitle>
                <Card.Text>email</Card.Text>
                <Card.Text>IDP camp, address</Card.Text>.
            </Card.Body>
        </Card>

        </Container>
        
        </div>
    )
}

export default HouseholdList;