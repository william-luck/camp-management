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
import InputGroup from 'react-bootstrap/InputGroup';
import NewHouseholdMemberForm from "./NewHouseholdMemberForm";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';


function EditCard({ household, setSelectedHousehold, selectedHousehold, location }) {

    const [headOfHHShow, setHeadOfHHShow] = useState(false);
    const [headOfHHConfirm, setHeadOfHHConfirm] = useState(false)
    const [addressShow, setAddressShow] = useState(false)
    const [addressConfirm, setAddressConfirm] = useState(false)
    const [householdInfoShow, setHouseholdInfoShow] = useState(false)
    const [householdInfoConfirm, setHouseHoldinfoConfirm] = useState(false)

    const [addNewHouseholdMember, setAddNewHouseholdMember] = useState(false)
    const [newHouseholdMemberConfirm, setNewHouseholdMemberConfirm] = useState(false)
    const [memberDeleteConfirm, setMemberDeleteConfirm] = useState(false)
    const [householdDeleteConfirm, setHouseholdDeleteConfirm] = useState(false)
    

    let headOfHousehold = household.beneficiaries.find(beneficiary => beneficiary.head_of_HH)

    const [headOfHHValue, setHeadOfHHValue] = useState(headOfHousehold.name)
    const [addressValue, setAddressValue] = useState(household.address)
    const [nationalIdNumberValue, setNationalIdNumberValue] = useState('')
    const [phoneNumberValue, setPhoneNumberValue] = useState('')
    const [selectedBeneficiary, setSelectedBeneficiary] = useState('')

    const [accordionKey, setAccordionKey] = useState(1)



    function handleIDandAddressClick(beneficiary) {
        setNationalIdNumberValue(beneficiary.national_id_number)
        setPhoneNumberValue(beneficiary.phone_number)
        setSelectedBeneficiary(beneficiary)
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

    function handleHeadOfHouseholdSubmit(e) { 
        e.preventDefault()
        
        let newHead = household.beneficiaries.find(beneficiary => beneficiary.name === headOfHHValue)
        let change = {head_of_HH: true}

        // For changing head of household status to selected beneficiary
        fetch(`/beneficiaries/${newHead.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(change)
            })
                .then(response => response.json())
                .then(changedBeneficiary=> {
                    setHeadOfHHShow(false)
                    console.log(changedBeneficiary)
                    // For rendering change on page
                    household.beneficiaries.find(beneficiary => beneficiary.id === changedBeneficiary.id).head_of_HH = true
                    return changedBeneficiary
                })
                .then(changedBeneficiary => {
                    // Filters by head of HH (should be two), then second criterion of selecting the beneficiary who was not changed as part of the previous fetch (the previous head of HH)
                    let previousHeadOfHousehold = household.beneficiaries.filter(beneficiary => beneficiary.head_of_HH && beneficiary.id !== changedBeneficiary.id)[0]
                    let newChange = {head_of_HH: false}
                    fetch(`/beneficiaries/${previousHeadOfHousehold.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                            body: JSON.stringify(newChange)
                        })
                            .then(response => response.json())
                            .then(previousHead => {
                                console.log(previousHead)
                                // For rendering on page
                                previousHeadOfHousehold.head_of_HH = false
                                setHeadOfHHConfirm(true)
                                setTimeout(() => setHeadOfHHConfirm(false), 3000)
                            })
                    })
                

                    
    }

    function handlePhoneOrIDSubmit(e) {
        e.preventDefault()
        
        setAccordionKey(accordionKey+1)

        let updatedData = {
            phone_number: phoneNumberValue,
            national_id_number: nationalIdNumberValue
        }

        fetch(`/beneficiaries/${selectedBeneficiary.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(change => {
                household.beneficiaries.find(beneficiary => beneficiary.id === change.id).phone_number = change.phone_number
                household.beneficiaries.find(beneficiary => beneficiary.id === change.id).national_id_number = change.national_id_number
                setHouseHoldinfoConfirm(change)
                setTimeout(() => setHouseHoldinfoConfirm(false), 3000)
            })
    }

    function handleDeleteMember(e, beneficiary) {
        e.preventDefault()

        fetch(`beneficiaries/${beneficiary.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                // Remove beneficiary from household before re-render and state changes
                let index = household.beneficiaries.findIndex(member => member.id === beneficiary.id)
                household.beneficiaries.splice(index, 1)
            })
            .then(() => {
                setMemberDeleteConfirm(true)
                setTimeout(() => setMemberDeleteConfirm(false), 3000)
                setAccordionKey(accordionKey+1)
            })
    }

    function handleDeleteHousehold(e) {
        e.preventDefault() 

        fetch(`households/${household.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setHouseholdDeleteConfirm('alert')
                setTimeout(() => setHouseholdDeleteConfirm('skip'), 6000)
            })


    }

    if (householdDeleteConfirm === 'alert') {
        return <Alert variant="danger">Household headed by {headOfHousehold.name} has been removed from the camp. All beneficiaries within the household have also been deleted.</Alert>
    }

    if (householdDeleteConfirm === 'skip') {
        return(
            <></>
        )
    }
        
    
        

    return (
        <>
            
            <Card>
            <Row>
                {/* Head of HH overview */}
                <Col xs={5}>
                    <Card.Body>
                        <Card.Title style={headOfHHShow ? {display: 'inline-block', color: 'green'} : {display: 'inline-block'}}>Head of HH: {headOfHousehold.name}
                        {' '}
                        <Button 
                            variant="link"
                            onClick={() => setHeadOfHHShow(!headOfHHShow)}
                            aria-controls="example-collapse-text"
                            aria-expanded={headOfHHShow}
                            style={{display: "inline-block"}}
                            size='sm'
                        >{!headOfHHShow ? 'Edit' : 'Hide'}</Button>
                        {headOfHHConfirm ? <Badge bg='success'>Saved</Badge> : null }
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">National ID number: {headOfHousehold.national_id_number}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Phone Number: {headOfHousehold.phone_number}</Card.Subtitle>
                        
                    </Card.Body>
                </Col>
                
                {/* Address overview*/}
                <Col>
                    <Card.Body>
                        
                        <Card.Subtitle className="mb-2 text-muted">Address</Card.Subtitle>
                        {' '}
                       
                        <Card.Title style={addressShow ? {display: 'inline-block', color: 'green'} : {display: 'inline-block'}}>{household.address}
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

                {/* HH members overview */}
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
            <Container>{memberDeleteConfirm ? <Alert variant={'danger'}>{selectedBeneficiary.name} removed from household and camp.</Alert> : null}</Container>
            <Row>
                <Col>
                
                {/* Edit head of HH */}
                <Collapse in={headOfHHShow}>
                    <div id="example-collapse-text">
                        <Card.Body>
            
                        <Form onSubmit={(e) =>handleHeadOfHouseholdSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Head of HH</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setHeadOfHHValue(e.target.value)}>
                                {household.beneficiaries.map(beneficiary => {
                                    return <option value={beneficiary.name} key={beneficiary.id}>{beneficiary.name}</option>
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
                    <div id="edit-household-information" >
                        
                        <Accordion key={accordionKey}>
                            {/* Map Accordian Items according to HH member  */}
                            {household.beneficiaries.sort((a,b) => Number(b.head_of_HH) - Number(a.head_of_HH)).map(beneficiary => {
                                return (
                                    <Accordion.Item eventKey={beneficiary.id} key={beneficiary.id}>
                                        <Accordion.Header onClick={() => handleIDandAddressClick(beneficiary)}>{beneficiary.name} ({beneficiary.gender}) {beneficiary.head_of_HH ? '--Head of Household' : null} &nbsp; {householdInfoConfirm.id === beneficiary.id ? <Badge bg='success'>Information Updated</Badge> : null }{newHouseholdMemberConfirm.id === beneficiary.id ? <Badge bg='success'>Successfully added to household</Badge> : null}</Accordion.Header>
                                        <Accordion.Body>
                                        <Form onSubmit={handlePhoneOrIDSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>National ID number</Form.Label>
                                                <Form.Control placeholder="address" value={nationalIdNumberValue} onChange={(e) => setNationalIdNumberValue(e.target.value)}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Phone number</Form.Label>
                                                <Form.Control placeholder="address" value={phoneNumberValue} onChange={e => setPhoneNumberValue(e.target.value)}/>
                                            </Form.Group>

                                            <Row>
                                            <Col className="text-center">
                                            <Button variant="primary" type="submit">
                                                Update Data
                                            </Button>
                                            </Col>

                                            <Col className="text-center">
                                            
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    beneficiary.head_of_HH ? <Tooltip>Assign another head of HH before deletion</Tooltip> : <Tooltip>This beneficiary will also be removed from the camp</Tooltip>
                                                    
                                                }
                                                >
                                                <span><Button variant="danger" disabled={beneficiary.head_of_HH ? true : false} onClick={(e) => handleDeleteMember(e, beneficiary)}>Remove Member from Household</Button></span>
                                            </OverlayTrigger>
                                        
                                            </Col>
                                            </Row>

                                            
                                        </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    
                                )
                            })}
                        </Accordion>

                        <br></br>
                        <Row>
                            <Col className="text-center">
                            <Button size="lg" onClick={() => setAddNewHouseholdMember(!addNewHouseholdMember)}>{!addNewHouseholdMember ? 'Add Household Member' : 'Hide Form'}</Button>
                            </Col>
                            <Col className="text-center">
                                <Button size="lg"  variant='danger' onClick={(e) => handleDeleteHousehold(e)}>Remove HH from Camp</Button>
                            </Col>
                        </Row>
                        <br></br>
                    </div>
                </Collapse>
                
                {/* New HH member form */}
                <Collapse in={addNewHouseholdMember}>
                    <div>
                        <Container>
                            <NewHouseholdMemberForm 
                                household={household} 
                                addNewHouseholdMember={addNewHouseholdMember} 
                                setAddNewHouseholdMember={setAddNewHouseholdMember}
                                setNewHouseholdMemberConfirm={setNewHouseholdMemberConfirm}
                                location={location}
                                />
                        </Container>
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