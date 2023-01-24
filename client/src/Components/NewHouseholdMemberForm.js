import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function NewHouseholdMemberForm({ household, addNewHouseholdMember, setAddNewHouseholdMember, setNewHouseholdMemberConfirm, setNewHousehold, location, user, households}) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [address, setAddress] = useState('')

    const [errors, setErrors] = useState([])

    const history = useHistory() 

    function householdMemberObject() {

        let formData = {
            name:  firstName + ' ' + lastName,
            gender: gender,
            DOB: dateOfBirth,
            phone_number: '+964-' + phoneNumber.replace(/[^\d]/g, ''),
            national_id_number: idNumber,
        }


        return formData;

    }

    // function createHouseholdAndAccount() {


    //     // This function should create the household, the account, and the beneficiary as head of HH (three seperate post requests, in that order)

    //     let householdCreation = {
    //         address: address,
    //         date_of_entry: new Date().toJSON().slice(0, 10)
    //     }

    //     // First creates a household using the form address and today's date
    //     fetch(`/households`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(householdCreation)
    //     })
    //         .then(r => r.json())
    //         .then(createdHousehold => {


    //             // then takes the form data and adds the inputted beneficiary as the head of HH, and uses the ID from the househohld created in the previous fetch request
    //             let newHouseholdData = householdMemberObject()
    //             newHouseholdData.head_of_HH = true
    //             newHouseholdData.household_id = createdHousehold.id

    //             fetch(`beneficiaries`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(newHouseholdData)
    //             })
    //                 .then(r => r.json())
    //                 .then((createdBeneficiary) => {
    //                     // then I want to create the account for the beneficiary, 


    //                     fetch(`accounts`, {
    //                         method: 'POST', 
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         },
    //                         body: JSON.stringify({
    //                             user_id: user.id,
    //                             household_id: createdHousehold.id, 
    //                             funds: 0
    //                         })
    //                     })
    //                         .then(r => r.json())
    //                         .then(newAccount => {
    //                             setNewHousehold(createdHousehold)

    //                             history.push('/edit-hhs')
                                

    //                         })
    //                 })
                
    //         })
    // }


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
            .then(response => {
                if (response.ok) {
                    response.json().then(newBeneficiary => {
                        setNewHouseholdMemberConfirm(newBeneficiary)
                        household.beneficiaries.push(newBeneficiary)
                        setTimeout(() => setNewHouseholdMemberConfirm(false), 3000)
                        }).then(() => setAddNewHouseholdMember(!addNewHouseholdMember))
                        clearFormData(e)
                } else {
                    response.json().then(errors => setErrors(errors.errors))
                }
            })

    }

    function handleSubmit(e) {

        e.preventDefault()

        if (location.pathname === '/add-new-hh') {
            // createHouseholdAndAccount()
            newArrival()
        } else {
            createBeneficiary(e)
        }

    }

    function newArrival() {

        let householdCreation = {
            address: address,
            date_of_entry: new Date().toJSON().slice(0, 10)
        }

        fetch('/households', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(householdCreation)
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(createdHousehold => {

                    // take the data and create beneficiary 
                    let newBeneficiaryData = householdMemberObject()
                    newBeneficiaryData.head_of_HH = true
                    newBeneficiaryData.household_id = createdHousehold.id

                    fetch('/beneficiaries', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newBeneficiaryData)
                    })
                        .then(response => {
                            if (response.ok) {
                                response.json().then(createdBeneficiary => {
                                    // Create the account
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
                                        .then(response => response.json())
                                        .then(() => {
                                            setNewHousehold(createdHousehold)
                                            history.push('/edit-hhs')
                                        })
                                })
                            } else {
                                // Add errors to household errors
                                response.json().then(beneficiaryErrors => {
                                    setErrors(...errors, beneficiaryErrors.errors)
                                })
                            }
                        })
                    })
                } 
                // else {
                //     // Error for household address, should only be one array element
                //     response.json().then(errors => setErrors(errors.errors))

                //     // Do I want to try creating beneficiary anyway? But I need the created household ID to create the beneficiary...
                    
                // }
            })

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
            <Form.Label>Name and Gender*</Form.Label><Form.Text style={{float: 'right'}}>* indicates required field</Form.Text>
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
                <Form.Label>Date of Birth*</Form.Label>
                <Form.Control type="date" onChange={e => setDateOfBirth(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone Number*</Form.Label>
                <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">+964-</InputGroup.Text>    
                <Form.Control placeholder='Enter phone number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>National ID Number*</Form.Label>
                <Form.Control placeholder='Enter national ID number' value={idNumber} onChange={e => setIdNumber(e.target.value)}/>
            </Form.Group>

            {/* Renders additional form question if navigated from new HH arrival tab */}
            {location.pathname === '/add-new-hh' ? 
                <Form.Group>
                    <Form.Label>Address in Camp</Form.Label>
                    <Form.Control placeholder="Enter the new household's address " value={address} onChange={e => setAddress(e.target.value)}/>
                </Form.Group>
            : null}

            {errors.length > 0 ? <Alert variant="danger" dismissible onClose={() => setErrors([])}>
                The following errors occured: 
                <ul>
                    {errors.map(error => <li>{error}</li>)}
                </ul>
            </Alert> : null}

            <br></br>

            <Button variant="primary" type="submit">
                {location.pathname === '/add-new-hh' ? 'Create Household' : 'Add New Member'}
            </Button>
        </Form>


    )

}

export default NewHouseholdMemberForm;