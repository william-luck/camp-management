import {React, useState, useEffect} from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Badge from 'react-bootstrap/Badge';


function HouseholdCard({ household, selectedHouseholds, setSelectedHouseholds, alertShow, multipleDistributionAmount, distributionEvent, currentEvent, user }) {

    const [selected, setSelected] = useState(false)
    const [distributionAmount, setDistributionAmount] = useState('12000')

    const [individualAlert, setIndividualAlert] = useState(false)

    const [errors, setErrors] = useState([])

    const headOfHH = household.beneficiaries.filter(beneficiary => beneficiary.head_of_HH)[0]




    // When selected households change (upon select all), set selected status if household is in array of selected households 
    // (will return true if select all)
    useEffect(() => {
        setSelected(selectedHouseholds.includes(household.id))

    }, [selectedHouseholds])

    function handleDistribute() {

        const newDistribution = {
            account_id: household.id,
            amount: household.beneficiaries.length * parseInt(distributionAmount),
            date: new Date().toJSON().slice(0, 10),
            collected: false,
            event_id: currentEvent
        }

        // If user ID (lives in state in App), continue, if not, set errors that you are not responsible for them. 

        // if (user.id !== household.account.user_id) {
        //     console.log('you are not responsible for this household')
        // }

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
                    setIndividualAlert(distribution.amount)
                })
            
    }

    function displayIndividualAlert() {
        setTimeout(() => setIndividualAlert(false), 3000)
    }

    function permission() {
        if ((user.id !== household.account.user_id) || (selectedHouseholds.length > 0)) {
            return true
        } else {
            return false
        }

        // selectedHouseholds.length > 0 ? true : false}

    }

    function permission_select() {
        if (user.id !== household.account.user_id) {
            return true
        } else {
            return false
        }
    }
       

    return (
        <>
        <Card border={selected ? 'dark' : null} bg={selected ? 'info' : null} text={selected ? "white" : null}>
        <Row>
            <Col xs={1}>
                <br></br>
                <br></br>
                <br></br>
                <Container>
                <Form.Group className="mb-3" controlId={`${household.id}`}>
                <Form.Check type="checkbox" checked={selected ? true : false} disabled={permission_select()} onChange={(e) => {
                    if (selected) {
                        // Change appearance of box
                        setSelected(!selected) 
                        // Remove household from array of selected households
                        let tempSelected = [...selectedHouseholds]
                        let index = tempSelected.indexOf(household.id)
                        tempSelected.splice(index, 1)
                        setSelectedHouseholds(tempSelected)
                    } else {
                        // Change appearnce of box
                        setSelected(!selected)
                        // Add household ID to array of selected households (for eventual POST to account)
                        let tempSelected = [...selectedHouseholds]
                        tempSelected.push(household.id)
                        setSelectedHouseholds(tempSelected)
                    }
                    
                    }}/>
                </Form.Group>
                </Container>
            </Col>
            <Col>
                <Card.Body>
                <Card.Title>Head of HH: {headOfHH.name}</Card.Title>
                <Card.Subtitle className={selected ? "mb-2" : "mb-2 text-muted"} >Date of entry: {household.date_of_entry}</Card.Subtitle>
                <Card.Subtitle className={selected ? "mb-2" : "mb-2 text-muted"}>National ID number: {headOfHH.national_id_number}</Card.Subtitle>
                <Card.Subtitle className={selected ? "mb-2" : "mb-2 text-muted"}>Household members: {household.beneficiaries.length}</Card.Subtitle>
                <Card.Text>
                    {/* Calculate funds by adding the distribution amounts under the current distirbution event */}
                    Funds in account: {household.account.distributions.filter(distribution => distribution.event_id === currentEvent).reduce((acc, dist) => acc + dist.amount, 0)}
                    {' '}{alertShow && distributionEvent.includes(household.id) ? <Badge bg="success"> +{multipleDistributionAmount * household.beneficiaries.length} IQD</Badge> : null}
                         {individualAlert ? <Badge bg="success"> +{individualAlert} IQD</Badge> : null} 
                         {individualAlert ? displayIndividualAlert() : null}
                </Card.Text>
                </Card.Body>
            </Col>

            
                <Col xs={4}>
                <br></br>
                <br></br>
                <br></br>
                <Row>
                <Col>
                    <Form.Control placeholder="amount" value={distributionAmount} onChange={e => setDistributionAmount(e.target.value)} style={{display: "inline-block"}} disabled={permission()}/>
                </Col>
                <Col>
                    <Button variant ="dark"style={{display: "inline-block"}} onClick={() => handleDistribute()} disabled={permission()}>Distribute</Button>
                </Col>
                </Row>
                {user.id !== household.account.user_id ? <Form.Text>Unable to distribute. You are not responsible for this household.</Form.Text> : null}
                </Col>
        
            
        </Row>
        </Card>


        
        <br></br>
        </>
    )
}

export default HouseholdCard;