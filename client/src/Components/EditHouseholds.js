import React from "react";
import Container from "react-bootstrap/esm/Container";
import EditCard from "./EditCard";
import { useState } from "react";

function EditHouseholds( {households}) {

    return (
        <div style={{maxHeight: '800px', overflowY: 'scroll'}}>
        
        <Container>
        <div style={{fontSize: 'x-large', display:'inline-block'}}>Edit Camp Households</div>
        {households.map(household => {
            return <EditCard household={household} key={household.id}/>
        })}
        </Container>
        
        </div>
    )
}

export default EditHouseholds;