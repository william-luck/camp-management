import React from "react";
import NewHouseholdMemberForm from "./NewHouseholdMemberForm";


function NewHousehold({ setNewHousehold, location}) {

    return (
        <>
        <div style={{fontSize: 'x-large'}}>Add new HH to the Camp</div>
        <br></br>
        <div>Start by adding the head of household. An account will be created for the beneficiary to receive distributions, and you will be redirected to the edit page to add further household members. </div>
        <br></br>
        <hr/>
        <br></br>
        <NewHouseholdMemberForm setNewHousehold={setNewHousehold} location={location}/>
        </>
    )

}

export default NewHousehold;