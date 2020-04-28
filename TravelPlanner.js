import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AirlineTag from './AirlineTag.js';
import HotelTag from './HotelTag.js';

class TravelPlanner extends React.Component{

    state = {
        tripName: 'TRIP NAME NOT FOUND'
    }

    render(){
        return(
            <>
                <Container>
                    <Row>
                        <Col>
                            <h1>This is the picture area</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AirlineTag />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <HotelTag />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>This and below, are the chosen events</h1>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

}

export default TravelPlanner;