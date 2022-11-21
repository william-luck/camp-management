import {React, useEffect, useState} from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";

import HouseholdCard from "./HouseholdCard";


function HouseholdList() {

    const [households, setHouseholds] = useState([])

    useEffect(() => {
        fetch('/households')
            .then(response => response.json())
            .then(households => setHouseholds(households))
    }, [])

    

    return (
        <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
        <Container>

        {households.map(household => <HouseholdCard key={household.id} household={household}/>)}

        </Container>
        
        </div>
    )
}

export default HouseholdList;