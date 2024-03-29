import {React, useEffect, useState} from "react";


import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';


import Offcanvas from 'react-bootstrap/Offcanvas';

import HouseholdCard from "./HouseholdCard";
import SuccessAlert from "./SuccessAlert";

import Alert from 'react-bootstrap/Alert';


function HouseholdList({ households, setHouseholds, currentEvent, setCurrentEvent, user }) {

  
    const [selectedHouseholds, setSelectedHouseholds] = useState([])

    const [distributionEvent, setDistributionEvent] = useState([])
    const [distributionAmount, setDistributionAmount] = useState('12000')
    const [ocShow, setOcShow] = useState(false);
    const [newEventOcShow, setNewEventOcShow] = useState(false)
    const [alertShow, setAlertShow] = useState(false)
    const [newDistributionEventAlertShow, setNewDistributionEventAlertShow] = useState(false)

    const [householdMatchingID, setHouseholdMatchingID] = useState('')
    const [error, setError] = useState([])

    useEffect(() => {
        
    }, [])
    
    



    

    function handleSelectAll() {

        let selectedHouseholdsAllInfo = households.filter(household => household.account.user_id === user.id)
        // if all already selected, deselect all
        if (selectedHouseholds.length === households.filter(household => household.account.user_id === user.id).length) {
            setSelectedHouseholds([])
        } else {
            // add all HHs to selected HH array
            let tempSelected = []
            for (const household of selectedHouseholdsAllInfo) {
                tempSelected.push(household.id)
            }
            setSelectedHouseholds(tempSelected)
        }
    }

    function handleDistributeSelected(e) {

        // Makes a copy of the selected household array indexes, for calculating distribution totals in alert
        setDistributionEvent([...selectedHouseholds])

        e.preventDefault()


        for (const selectedHousehold of selectedHouseholds) {
            let household = households.find(household => household.id === selectedHousehold)

            const newDistribution = {
                account_id: selectedHousehold,
                amount: household.beneficiaries.length * parseInt(distributionAmount),
                date: new Date().toJSON().slice(0, 10),
                collected: false, 
                event_id: currentEvent
            }
            
            fetch(`/distributions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(newDistribution)
                })
                    .then(response => response.json())
                    .then(distribution => {
                        household.account.distributions.push(distribution)
                    })
                    .then(() => {
                        setSelectedHouseholds([])
                        setOcShow(false)
                        setAlertShow(true)
                    })
        }
        
    }

    function handleNewEvent(e) {

        setNewEventOcShow(false)
        setNewDistributionEventAlertShow(true)

        // Creates a new distribution event, all future distributions will be associated with the new event.
        fetch('/events', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: new Date().toJSON().slice(0, 10)})
        })
            .then(r => r.json())
            .then(() => setCurrentEvent(currentEvent+1))
    }

    function searchNationalIdNumber(e) {


        if (e.target.value.length === 9) {
            fetch(`beneficiaries/${e.target.value}`)
                .then(response => {
                    if (response.ok) {
                        response.json().then((matchingBeneficiary) => {
                            setHouseholdMatchingID(households.filter(household => household.beneficiaries.find(beneficiary => beneficiary.national_id_number === matchingBeneficiary.national_id_number) !== undefined))
                        })
                    } else {
                        response.json().then(message => setError(message))
                    }
                })
        } else {
            setHouseholdMatchingID('')
            setError('')
        }     
    }


        

    const offCanvas = (
        <Offcanvas show={ocShow} onHide={() => setOcShow(false)} placement='bottom'>
            <Container>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title as={'h2'}>Distribute to {selectedHouseholds.length} selected household{selectedHouseholds.length > 1 ? 's' : null}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body as="h6">
            Enter an amount to be distributed to each member in each HH. The default distribution value is 12,000 IQD per HH member, per month.
            </Offcanvas.Body>
            <Offcanvas.Body>

            <Form>
            <Row>
                <Col>
                    <Form.Control placeholder="amount" value={distributionAmount} onChange={(e) => setDistributionAmount(e.target.value)}style={{display: "inline-block"}}/>
                </Col>
                <Col>
                    <Button variant ="dark" style={{display: "inline-block"}} onClick={handleDistributeSelected} type='submit'>Distribute</Button>
                </Col>
            </Row>
            </Form>
            </Offcanvas.Body>

            </Container>
        </Offcanvas>
    )

    const newEventOffCanvas = (
        <Offcanvas show={newEventOcShow} onHide={() => setNewEventOcShow(false)} placement='top'>
            <Container>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title as={'h2'}>Start new distribution?</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body as="h6">
            Starting a new distribution will create a new distribution event for the camp, and reset household account funds to zero. Continue?
            </Offcanvas.Body>
            <Offcanvas.Body>
                <div>
                    <Button onClick={() => handleNewEvent()} style={{display: 'inline-block'}}>Confirm</Button>
                    {' '}
                    <Button onClick={() => setNewEventOcShow(false)} style={{display: 'inline-block'}} variant='danger'>Cancel</Button>

                </div>
                

            </Offcanvas.Body>

            </Container>
        </Offcanvas>
    )

    const newDistributionEventAlert = (
        <Alert variant="warning" dismissible onClose={() => setNewDistributionEventAlertShow(false)}>
                <Alert.Heading>
                    New distribution event created.
                </Alert.Heading>
                <p>
                    All household account funds have been reset. Subsequent distributions will be grouped under Camp Distribution #{currentEvent}
                </p>
        </Alert>
    )

    



    return (
        <div>
        <Container>
            <div>
                <div style={{fontSize: 'x-large', display: 'inline-block'}}>Camp Distribution #{currentEvent}</div>
                <div style={{ float: 'right', display: 'inline-block'}}><Button onClick={() => setNewEventOcShow(true)}>New Distribution Event</Button></div>
            </div>
            <p></p>
            <div style={{fontSize: 'x-large', display:'inline-block'}}>Distribute to Households in IDP Camp</div>
            <div style={{float: 'right', display: 'inline-block'}}>
                {selectedHouseholds.length > 0 ? <Button style={{ marginRight: "5px"}} onClick={() => setOcShow(true)}>Distribute to Selected</Button> : null }
                {offCanvas}
                {newEventOffCanvas}
                <Button  onClick={() => handleSelectAll()}>{selectedHouseholds.length === households.filter(household => household.account.user_id === user.id).length ? 'Deselect All Possible' : "Select All Possible"}</Button>
            </div>
            <Form><Form.Control placeholder="Search by national ID number.."  onChange={(e) => searchNationalIdNumber(e)} style={{display: "inline-block"}}/></Form>
            
            <p></p>
            {alertShow ? <SuccessAlert setAlertShow={setAlertShow} distributionAmount={distributionAmount} distributionEvent={distributionEvent} households={households}/> : null}
            {newDistributionEventAlertShow ? newDistributionEventAlert : null}
            {error ? <p>{error}</p> : null}

            <div style={{maxHeight: '725px', overflowY: 'scroll'}}>
            <Form>
            {!householdMatchingID ?   
            households.map(household => {
                return (
                <HouseholdCard 
                    key={household.id} 
                    household={household} 
                    selectedHouseholds={selectedHouseholds} 
                    setSelectedHouseholds={setSelectedHouseholds}
                    alertShow={alertShow}
                    multipleDistributionAmount={distributionAmount}
                    distributionEvent={distributionEvent}
                    currentEvent={currentEvent}
                    user={user}
                />
                )
            }) : 
            householdMatchingID.map(household => {
                return (
                <HouseholdCard 
                    key={household.id} 
                    household={household} 
                    selectedHouseholds={selectedHouseholds} 
                    setSelectedHouseholds={setSelectedHouseholds}
                    alertShow={alertShow}
                    multipleDistributionAmount={distributionAmount}
                    distributionEvent={distributionEvent}
                    currentEvent={currentEvent}
                    user={user}
                />
                )

            })
            } 
            </Form>
            </div>
        </Container>
        </div>
    )
}

export default HouseholdList;