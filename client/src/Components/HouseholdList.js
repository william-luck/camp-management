import {React, useEffect, useState} from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';

import Alert from 'react-bootstrap/Alert';



import Offcanvas from 'react-bootstrap/Offcanvas';

import HouseholdCard from "./HouseholdCard";


function HouseholdList() {

    const [households, setHouseholds] = useState([])
    const [selectedHouseholds, setSelectedHouseholds] = useState([])
    const [prevDistributionInformation, setPrevSelected] = useState({})
    const [distributionAmount, setDistributionAmount] = useState('12000')

    const [ocShow, setOcShow] = useState(false);
    const [alertShow, setAlertShow] = useState(false)
    

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

    function handleDistributeSelected(e) {

        e.preventDefault()

        setPrevSelected([...selectedHouseholds])

        for (const selectedHousehold of selectedHouseholds) {
            let tempHouseholds = [...households]

            let household = tempHouseholds[selectedHousehold]

            const newDistribution = {
                account_id: household.id,
                amount: household.beneficiaries.length * parseInt(distributionAmount),
                date: new Date().toJSON().slice(0, 10),
                collected: false
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
                        tempHouseholds[selectedHousehold].account.distributions.push(distribution)
                        setHouseholds(tempHouseholds)
                    })

            // Clears selected households (none selected)
            setSelectedHouseholds([])
            setOcShow(false)
            setAlertShow(true)

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

    const alert = (
        <Alert variant="success" dismissible onClose={() => setAlertShow(false)}>
                <Alert.Heading>
                    Success!
                </Alert.Heading>
                <p>
                    You have distibuted {distributionAmount} IQD per HH member to  HHs. You distributed a total ofAccount balances have been updated.
                </p>
        </Alert>
    )




    
    return (
        <div>
        <Container>
            <div style={{fontSize: 'x-large', display:'inline-block'}}>Distribute to Households in IDP Camp</div>
            <div style={{float: 'right', display: 'inline-block'}}>
                {selectedHouseholds.length > 0 ? <Button style={{ marginRight: "5px"}} onClick={() => setOcShow(true)}>Distribute to Selected</Button> : null }
                {offCanvas}
                <Button onClick={() => handleSelectAll()}>{selectedHouseholds.length === households.length ? 'Deselect All' : "Select All"}</Button>
            </div>
            {alertShow ? alert : null}
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