import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import EditCard from "./EditCard";
import { useRef } from "react";

function EditHouseholds( {households, location, newHousehold, setNewHousehold, user, householdDeleted, setHouseholdDeleted}) {

    const scroll = useRef(null)

    // if (newHousehold) {
    //     if (scroll.current ) {
    //         scroll.current.scrollIntoView(true)
    // }
    // }

    useEffect(() => {
        if (scroll.current && newHousehold) {
            scroll.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [newHousehold])




    return (
        <div style={{maxHeight: '800px', overflowY: 'scroll'}}>
        
        <Container>
        <div style={{fontSize: 'x-large', display:'inline-block'}}>Edit Camp Households</div>
        {households.map(household => {
            return <EditCard household={household} key={household.id} location={location} newHousehold={newHousehold} user={user} households={households} householdDeleted={householdDeleted} setHouseholdDeleted={setHouseholdDeleted}/>
        })}

        <div ref={scroll}></div>
        
        </Container>
        
        
        </div>
    )

}


export default EditHouseholds;