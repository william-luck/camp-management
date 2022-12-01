import React from "react";
import Alert from 'react-bootstrap/Alert';


function SuccessAlert({ setAlertShow, distributionAmount, distributionEvent, households}) {

    let affectedHouseholds = []
    // Pushes all HH information to array of affected households 
    for (const distributedHousehold of distributionEvent) {
        affectedHouseholds.push(households[distributedHousehold])
    }

    let latestDistributions = []
    // Pushes the last distribution of each HH to array
    for (const distributedHousehold of affectedHouseholds) {
        let totalDistributions = distributedHousehold.account.distributions
        latestDistributions.push(totalDistributions[totalDistributions.length-1])
    }

    let totalAmount = latestDistributions.reduce((acc, dist) => acc + dist.amount, 0)

    return (
        <>
        <Alert variant="success" dismissible onClose={() => setAlertShow(false)}>
                <Alert.Heading>
                    Success!
                </Alert.Heading>
                <p>
                    You have distibuted {distributionAmount} IQD per HH member to {distributionEvent.length} HHs.
                     You distributed a total of {totalAmount} IQD to {totalAmount/distributionAmount} beneficiaries.
                     Account balances have been updated.
                </p>
        </Alert>
        </>
    )
}

export default SuccessAlert;