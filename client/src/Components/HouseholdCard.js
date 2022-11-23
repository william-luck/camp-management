import {React, useState, useEffect} from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function HouseholdCard({ household, defaultSelected }) {

    const [selected, setSelected] = useState(defaultSelected)

    const headOfHH = household.beneficiaries.filter(beneficiary => beneficiary.head_of_HH)[0]

   




    

    return (
        <>
        {selected ? 
        <Card border='primary' bg="info" text="white">
        <Row>
            <Col xs={1}>
                <br></br>
                <br></br>
                <br></br>
                <Container>
                <Form.Group className="mb-3" controlId={`${household.id}`}>
                <Form.Check type="checkbox" onChange={(e) => {
                    setSelected(!selected) 
                    console.log(e.target)
                    }}/>
                </Form.Group>
                </Container>
            </Col>
            <Col>
                <Card.Body>
                <Card.Title>Head of HH: {headOfHH.name}</Card.Title>
                <Card.Subtitle className="mb-2" >Date of entry: {household.date_of_entry}</Card.Subtitle>
                <Card.Subtitle className="mb-2">National ID number: {headOfHH.national_id_number}</Card.Subtitle>
                <Card.Subtitle className="mb-2">Household members: {household.beneficiaries.length}</Card.Subtitle>
                <Card.Text>Funds in account: {household.account.funds}</Card.Text>
                </Card.Body>
            </Col>
        </Row>
        </Card>
        : 
        <Card>
        <Row>
            <Col xs={1}>
                <br></br>
                <br></br>
                <br></br>
                <Container>
                <Form.Group className="mb-3" controlId={`${household.id}`}>
                <Form.Check type="checkbox" onChange={() => setSelected(!selected)}/>
                </Form.Group>
                </Container>
            </Col>
            <Col>
                <Card.Body>
                <Card.Title>Head of HH: {headOfHH.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date of entry: {household.date_of_entry}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">National ID number: {headOfHH.national_id_number}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Household members: {household.beneficiaries.length}</Card.Subtitle>
                <Card.Text>Funds in account: {household.account.funds}</Card.Text>
                </Card.Body>
            </Col>
        </Row>
        </Card>}


        
        <br></br>
        </>
    )
}

export default HouseholdCard;