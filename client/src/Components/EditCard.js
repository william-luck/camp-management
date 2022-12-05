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
import Badge from 'react-bootstrap/Badge';


function EditCard({ household }) {

    const [headOfHHShow, setHeadOfHHShow] = useState(false);
    const [addressShow, setAddressShow] = useState(false)
    const [householdInfoShow, setHouseholdInfoShow] = useState(false)
    const [addressConfirm, setAddressConfirm] = useState(false)

    let headOfHousehold = household.beneficiaries.find(beneficiary => beneficiary.head_of_HH)

    const [headOfHHValue, setHeadOfHHValue] = useState(headOfHousehold.name)
    const [addressValue, setAddressValue] = useState(household.address)
    const [nationalIdNumberValue, setNationalIdNumberValue] = useState('')
    const [phoneNumberValue, setPhoneNumberValue] = useState('')



    function handleIDandAddressClick(beneficiary) {
        setNationalIdNumberValue(beneficiary.national_id_number)
        setPhoneNumberValue(beneficiary.phone_number)
    }

    function handleAddressSubmit(e) {
        e.preventDefault()

        let addressUpdate = {address: addressValue}

        fetch(`/households/${household.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(addressUpdate)
            })
                .then(response => response.json())
                .then(changedHousehold=> {
                    // I want the address button to disband
                    setAddressShow(false)
                    household.address = changedHousehold.address
                    setAddressConfirm(true)
                    setTimeout(() => setAddressConfirm(false), 3000)
                    
                })
        


    }
    

    
    


    return (
        <>

    
            <Card>
            <Row>
                
                <Col xs={5}>
                    <Card.Body>
                        <Card.Title style={{display: 'inline-block'}}>Head of HH: {headOfHousehold.name}
                        {' '}
                        <Button 
                            variant="link"
                            onClick={() => setHeadOfHHShow(!headOfHHShow)}
                            aria-controls="example-collapse-text"
                            aria-expanded={headOfHHShow}
                            style={{display: "inline-block"}}
                            size='sm'
                        >{!headOfHHShow ? 'Edit' : 'Hide'}</Button>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">National ID number: {headOfHousehold.national_id_number}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Phone Number: {headOfHousehold.phone_number}</Card.Subtitle>
                        
                    </Card.Body>
                </Col>
                
                
                <Col>
                    <Card.Body>
                        
                        <Card.Subtitle className="mb-2 text-muted">Address</Card.Subtitle>
                        {' '}
                       
                        <Card.Title style={addressShow ? {display: 'inline-block', color: 'green'} : {display: 'inline-block'}}>{addressValue}
                        <Button 
                            variant="link"
                            onClick={() => setAddressShow(!addressShow)}
                            aria-controls="edit-address"
                            aria-expanded={addressShow}
                            style={{display: 'inline-block'}}
                        >{!addressShow ? 'Edit' : 'Hide'}</Button>
                        {addressConfirm ? <Badge bg='success'>Saved</Badge> : null }
                        </Card.Title>
                        
                    </Card.Body>
                </Col>

                <Col>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">HH members</Card.Subtitle>
                        <Card.Title style={{display: 'inline-block'}}>{household.beneficiaries.length}</Card.Title>
                        {' '}
                        <Button 
                            variant="link"
                            onClick={() => setHouseholdInfoShow(!householdInfoShow)}
                            aria-controls="edit-household-information"
                            aria-expanded={householdInfoShow}
                            style={{display: 'inline-block'}}
                        >{!householdInfoShow ? 'Expand' : 'Hide'}</Button>
                        
                        
                    </Card.Body>
                </Col>
            </Row>
            <Row>
                <Col>
                
                {/* Edit head of HH */}
                <Collapse in={headOfHHShow}>
                    <div id="example-collapse-text">
                        <Card.Body>
            
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Head of HH</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setHeadOfHHValue(e.target.value)}>
                                {/* <option>Default HH member</option>
                                <option value="1">Name (gender)</option>
                                <option value="2">Name (gender)</option>
                                <option value="3">Name (gender)</option> */}
                                {household.beneficiaries.map(beneficiary => {
                                    return <option value={beneficiary.name}>{beneficiary.name}</option>
                                })}
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>

                        </Card.Body>
                    </div>
                </Collapse>

                {/* Edit address */}
                <Collapse in={addressShow}>
                    <div id="edit-address">
                        <Card.Body>
                        <Form onSubmit={handleAddressSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="address" value={addressValue} onChange={e => setAddressValue(e.target.value)}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                        </Card.Body>
                    </div>
                </Collapse>

                {/* Edit beneficiaries in HH */}
                <Collapse in={householdInfoShow}>
                    <div id="edit-household-information">
                        
                        <Accordion>
                            {/* Map Accordian Items according to HH member  */}
                            {household.beneficiaries.sort((a,b) => Number(b.head_of_HH) - Number(a.head_of_HH)).map(beneficiary => {
                                return (
                                    <Accordion.Item eventKey={beneficiary.id} onClick={() => handleIDandAddressClick(beneficiary)}>
                                        <Accordion.Header>{beneficiary.name} ({beneficiary.gender}) {beneficiary.head_of_HH ? '--Head of Household' : null}</Accordion.Header>
                                        <Accordion.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>National ID number</Form.Label>
                                                <Form.Control placeholder="address" value={nationalIdNumberValue}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Phone number</Form.Label>
                                                <Form.Control placeholder="address" value={phoneNumberValue}/>
                                            </Form.Group>

                                            <Button variant="primary" type="submit">
                                                Save
                                            </Button>
                                        </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    
                                )
                            })}
                        </Accordion>
                    </div>
                </Collapse>

                </Col>

                
            </Row>
            
            </Card>

            <br></br>
            

    
        
        
        
        </>
    )
}

export default EditCard