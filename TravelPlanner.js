import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TravelPlanner extends React.Component{

    state = {
        tripName: 'TRIP NAME NOT FOUND'
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <Container>
                            <h1>{this.state.tripName}</h1>
                            <p>Cost: $100.00</p>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default TravelPlanner;