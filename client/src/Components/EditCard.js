import React from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import Collapse from 'react-bootstrap/Collapse';
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';


function EditCard() {

    const [headOfHH, setHeadOfHH] = useState(false);
    const [address, setAddress] = useState(false)
    const [householdInfo, setHouseholdInfo] = useState(false)


    return (
        <>

    
            <Card>
            <Row>
                
                <Col xs={5}>
                    <Card.Body>
                        <Card.Title style={{display: 'inline-block'}}>Head of HH: Name
                        {' '}
                        <Button 
                            variant="link"
                            onClick={() => setHeadOfHH(!headOfHH)}
                            aria-controls="example-collapse-text"
                            aria-expanded={headOfHH}
                            style={{display: "inline-block"}}
                            size='sm'
                        >{!headOfHH ? 'Edit' : 'Hide'}</Button>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">National ID number: 858493855</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Phone Number: +9643830248</Card.Subtitle>
                        
                    </Card.Body>
                </Col>
                
                
                <Col>
                    <Card.Body>
                        
                        <Card.Subtitle className="mb-2 text-muted">Address</Card.Subtitle>
                        {' '}
                       
                        <Card.Title style={{display: 'inline-block'}}>23C
                        <Button 
                            variant="link"
                            onClick={() => setAddress(!address)}
                            aria-controls="edit-address"
                            aria-expanded={address}
                            style={{display: 'inline-block'}}
                        >{!address ? 'Edit' : 'Hide'}</Button>
                        </Card.Title>
                        
                    </Card.Body>
                </Col>

                <Col>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">HH members</Card.Subtitle>
                        <Card.Title style={{display: 'inline-block'}}>7</Card.Title>
                        {' '}
                        <Button 
                            variant="link"
                            onClick={() => setHouseholdInfo(!householdInfo)}
                            aria-controls="edit-household-information"
                            aria-expanded={householdInfo}
                            style={{display: 'inline-block'}}
                        >{!householdInfo ? 'Expand' : 'Hide'}</Button>
                        
                        
                    </Card.Body>
                </Col>
            </Row>
            <Row>
                <Col>

                <Collapse in={headOfHH}>
                    <div id="example-collapse-text">
                        <Card.Body>
            
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Head of HH</Form.Label>
                                <Form.Select aria-label="Default select example">
                                <option>Default HH member</option>
                                <option value="1">Name (gender)</option>
                                <option value="2">Name (gender)</option>
                                <option value="3">Name (gender)</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>

                        </Card.Body>
                    </div>
                </Collapse>

                <Collapse in={address}>
                    <div id="edit-address">
                        <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="address" value={'23C'}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                        </Card.Body>
                    </div>
                </Collapse>

                <Collapse in={householdInfo}>
                    <div id="edit-household-information">
                        {/* <Card.Body>
                        <Card.Text>
                            Edit head of HH information here
                        </Card.Text>
                        </Card.Body> */}
                        <Accordion>
                            {/* Map Accordian Items according to HH member  */}
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Beneficiary name (head of HH)</Accordion.Header>
                                <Accordion.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>National ID number</Form.Label>
                                        <Form.Control placeholder="address" value={'857393875'}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control placeholder="address" value={'+96495739729'}/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                                </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Beneficiariy name (gender)</Accordion.Header>
                                <Accordion.Body>
                                Other Form
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Collapse>

                </Col>

                
            </Row>
            
            </Card>
            

    
        
        
        
        </>
    )
}

export default EditCard