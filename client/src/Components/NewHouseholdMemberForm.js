import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function NewHouseholdMemberForm({ household, addNewHouseholdMember, setAddNewHouseholdMember, setNewHouseholdMemberConfirm, setNewHousehold, location, user, households}) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [address, setAddress] = useState('')

    const history = useHistory() 

    function householdMemberObject() {

        let formData = {
            name:  firstName + ' ' + lastName,
            gender: gender,
            DOB: dateOfBirth,
            phone_number: phoneNumber,
            national_id_number: idNumber,
        }

        // head_of_HH: false, 
        // household_id: household.id
        // address: 

        return formData;

    }

    function createHouseholdAndAccount() {
        // This function should create the household, the account, and the beneficiary as head of HH (three seperate post requests, in that order)

        let householdCreation = {
            address: address,
            date_of_entry: new Date().toJSON().slice(0, 10)
        }

        // First creates a household using the form address and today's date
        fetch(`/households`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(householdCreation)
        })
            .then(r => r.json())
            .then(createdHousehold => {

                console.log(createdHousehold)


                // then takes the form data and adds the inputted beneficiary as the head of HH, and uses the ID from the househohld created in the previous fetch request
                let newHouseholdData = householdMemberObject()
                newHouseholdData.head_of_HH = true
                newHouseholdData.household_id = createdHousehold.id

                fetch(`beneficiaries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newHouseholdData)
                })
                    .then(r => r.json())
                    .then((createdBeneficiary) => {
                        // then I want to create the account for the beneficiary, 

                        console.log(createdBeneficiary)

                        fetch(`accounts`, {
                            method: 'POST', 
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                user_id: user.id,
                                household_id: createdHousehold.id, 
                                funds: 0
                            })
                        })
                            .then(r => r.json())
                            .then(newAccount => {
                                console.log(newAccount)
                                setNewHousehold(createdHousehold)

                                history.push('/edit-hhs')

                            })
                    })
                
            })
    }

    function createBeneficiary(e) {

        let beneficiaryCreation = householdMemberObject()
        beneficiaryCreation.head_of_HH = false
        beneficiaryCreation.household_id = household.id

        fetch(`/beneficiaries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(beneficiaryCreation)
        })
            .then(response => response.json())
            .then(newBeneficiary => {
                setNewHouseholdMemberConfirm(newBeneficiary)
                household.beneficiaries.push(newBeneficiary)
                setTimeout(() => setNewHouseholdMemberConfirm(false), 3000)
            })
            .then(() => {
                setAddNewHouseholdMember(!addNewHouseholdMember)
            })
    }

    function handleSubmit(e) {

        e.preventDefault()

        if (location.pathname === '/add-new-hh') {
            createHouseholdAndAccount()
        } else {
            createBeneficiary(e)
        }

        clearFormData(e)

    }

    function clearFormData(e) {
        setFirstName('')
        setLastName('')
        setGender('')
        setDateOfBirth('')
        setPhoneNumber('')
        setIdNumber('')
        setAddress('')
        e.target.reset()
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

            {/* Renders additional form question if navigated from new HH arrival tab */}
            {location.pathname === '/add-new-hh' ? 
                <Form.Group>
                    <Form.Label>Address in Camp</Form.Label>
                    <Form.Control placeholder="Enter the new household's address " value={address} onChange={e => setAddress(e.target.value)}/>
                </Form.Group>
            : null}

            <Button variant="primary" type="submit">
                {location.pathname === '/add-new-hh' ? 'Create Household' : 'Add New Member'}
            </Button>
        </Form>


    )

}

export default NewHouseholdMemberForm;