import {React, useEffect, useState} from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';

import HouseholdCard from "./HouseholdCard";


function HouseholdList() {

    const [households, setHouseholds] = useState([])
    const [selectedHouseholds, setSelectedHouseholds] = useState([])
    

    useEffect(() => {
        fetch('/households')
            .then(response => response.json())
            .then(households => setHouseholds(households))
    }, [])


    
    return (
        <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
        <Container>
            <div style={{fontSize: 'x-large', display:'inline-block'}}>Distribute to Households in IDP Camp</div>
            <div style={{float: 'right', display: 'inline-block'}}>
                <Button>Distribute All</Button>
            </div>
            <p></p>

            <Form>
            
            {households.map(household => {
                return (
                <HouseholdCard key={household.id} household={household} selectedHouseholds={selectedHouseholds} setSelectedHouseholds={setSelectedHouseholds}/>
                )
            })}
            
            
            </Form>

            

        

        </Container>
        
        </div>
    )
}

export default HouseholdList;