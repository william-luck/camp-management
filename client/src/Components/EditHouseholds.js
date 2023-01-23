import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import EditCard from "./EditCard";
import { useRef } from "react";

function EditHouseholds( {households, location, newHousehold, setNewHousehold}) {

    const scroll = useRef(null)

    // When new household is added to the database, I want to activate scroll.scrollIntoView()
    // useEffect(() => {
    //     if (newHousehold) {
    //         scroll.scrollIntoView()
    //     }
    // }, [])

    if (newHousehold) {
        if (scroll.current) {
            scroll.current.scrollIntoView({behavior: 'smooth'})
        }
    }



    return (
        <div style={{maxHeight: '800px', overflowY: 'scroll'}}>
        
        <Container>
        <div style={{fontSize: 'x-large', display:'inline-block'}}>Edit Camp Households</div>
        {households.map(household => {
            return <EditCard household={household} key={household.id} location={location}/>
        })}
        </Container>
        <div ref={scroll}></div>
        
        </div>
    )
}

export default EditHouseholds;