import React from "react";
import Container from "react-bootstrap/esm/Container";
import EditCard from "./EditCard";

function EditHouseholds() {
    return (
        <>
        
        <Container>
        <div style={{fontSize: 'x-large', display:'inline-block'}}>Edit Camp Households</div>
        <EditCard />
        </Container>
        
        </>
    )
}

export default EditHouseholds;