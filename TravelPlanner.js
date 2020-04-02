import React from 'react';
import Container from 'react-bootstrap/Container';
import CustomNavbar from './CustomNavbar.js';

class TravelPlanner extends React.Component{

    state = {
        tripName: 'TRIP NAME NOT FOUND'
    }

    render(){
        return(
            <>
                <Container>
                    <CustomNavbar />
                </Container>
            </>
        );
    }

}

export default TravelPlanner;