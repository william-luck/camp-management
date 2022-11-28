import {React, useEffect, useState} from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';


import Offcanvas from 'react-bootstrap/Offcanvas';

import HouseholdCard from "./HouseholdCard";


function HouseholdList() {

    const [households, setHouseholds] = useState([])
    const [selectedHouseholds, setSelectedHouseholds] = useState([])
    const [distributionAmount, setDistributionAmount] = useState('12000')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    useEffect(() => {
        fetch('/households')
            .then(response => response.json())
            .then(households => setHouseholds(households))
    }, [])

    function handleSelectAll() {
        // if all already selected, deselect all
        if (selectedHouseholds.length === households.length) {
            setSelectedHouseholds([])
        } else {
            // add all HHs to selected HH array
            let tempSelected = []
            for (let i=0; i < households.length; i++) {
                tempSelected.push(i)
            }
            setSelectedHouseholds(tempSelected)
        }
    }

    function handleDistributeSelected() {

        for (const selectedHousehold of selectedHouseholds) {
            let household = households[selectedHousehold]
            let newFunds = {funds: household.account.funds + (household.beneficiaries.length * parseInt(distributionAmount))}
            
            fetch(`/accounts/${selectedHousehold+1}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(newFunds)
                })

        }

    }

    const offCanvas = (
        <Offcanvas show={show} onHide={handleClose} placement='bottom'>
            <Container>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title as={'h2'}>Distribute to {selectedHouseholds.length} selected household{selectedHouseholds.length > 1 ? 's' : null}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body as="h6">
            Enter an amount to be distributed to each member in each HH. The default distribution value is 12,000 IQD per HH member, per month.
            </Offcanvas.Body>
            <Offcanvas.Body>

            <Row>
                <Col>
                    <Form.Control placeholder="amount" value={distributionAmount} onChange={(e) => setDistributionAmount(e.target.value)}style={{display: "inline-block"}}/>
                </Col>
                <Col>
                    <Button variant ="dark" style={{display: "inline-block"}} onClick={handleDistributeSelected}>Distribute</Button>
                </Col>
            </Row>


            </Offcanvas.Body>
            </Container>
        </Offcanvas>
    )


    
    return (
        <div>
        <Container>
            <div style={{fontSize: 'x-large', display:'inline-block'}}>Distribute to Households in IDP Camp</div>
            <div style={{float: 'right', display: 'inline-block'}}>
                {selectedHouseholds.length > 0 ? <Button style={{ marginRight: "5px"}} onClick={handleShow}>Distribute to Selected</Button> : null }
                {offCanvas}
                <Button onClick={() => handleSelectAll()}>{selectedHouseholds.length === households.length ? 'Deselect All' : "Select All"}</Button>
            </div>
            <p></p>

            <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
            <Form>
            {households.map(household => {
                return (
                <HouseholdCard 
                    key={household.id} 
                    household={household} 
                    selectedHouseholds={selectedHouseholds} 
                    setSelectedHouseholds={setSelectedHouseholds}
                />
                )
            })}
            </Form>
            </div>
        </Container>
        </div>
    )
}

export default HouseholdList;