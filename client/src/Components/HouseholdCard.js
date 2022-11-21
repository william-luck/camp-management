import React from "react";

import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";

function HouseholdCard({ household }) {

    const headOfHH = household.beneficiaries.filter(beneficiary => beneficiary.head_of_HH)[0]




    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title>Head of HH: {headOfHH.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date of entry: {household.date_of_entry}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">National ID number: {headOfHH.national_id_number}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Household members:{household.beneficiaries.length}</Card.Subtitle>
                <Card.Text>Funds in account: $0</Card.Text>
            </Card.Body>
        </Card>
        <br></br>
        </>
    )
}

export default HouseholdCard;