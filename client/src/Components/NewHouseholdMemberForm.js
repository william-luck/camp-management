import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

function NewHouseholdMemberForm({ household }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idNumber, setIdNumber] = useState('')

    function handleSubmit(e) {

        e.preventDefault()

        let formData = {
            name:  firstName + ' ' + lastName,
            gender: gender,
            DOB: dateOfBirth,
            phone_number: phoneNumber,
            national_id_number: idNumber,
            head_of_HH: false, 
            household_id: household.id
        }

        fetch(`/beneficiaries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(newBeneficiary => console.log(newBeneficiary))
    }

    return (
        <Form onSubmit={handleSubmit}>
                        
            <Form.Label>Name and Gender</Form.Label>
            <InputGroup className="mb-3">                
                <Form.Control placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Form.Control placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
                <Form.Select onChange={e => setGender(e.target.value)}>
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </Form.Select>
            </InputGroup>

            <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" onChange={e => setDateOfBirth(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder='Enter phone number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>National ID Number</Form.Label>
                <Form.Control placeholder='Enter national ID number' value={idNumber} onChange={e => setIdNumber(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Add new member
            </Button>
        </Form>


    )

}

export default NewHouseholdMemberForm;