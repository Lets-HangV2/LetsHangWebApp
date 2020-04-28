import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Title } from 'react-native-paper';

class AirlineTag extends React.Component{

    state = {
        
    };

    render(){
        return(
            <Container onClick={this.searchFlight}>
                <hr />
                <Row>
                    <Col md={2}>
                        <Avatar.Icon icon="airplane" />
                    </Col>
                    <Col>
                        <Row>
                            <Title>From: </Title>
                        </Row>
                        <Row>
                            <Title>To: </Title>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Title>Arrival: </Title>
                        </Row>
                        <Row>
                            <Title>Departure: </Title>
                        </Row>
                    </Col>
                    <Col>
                        <Title>Cost: </Title>
                    </Col>
                </Row>
            </Container>
        );
    }

    searchFlight=()=>{
        var origin, dest, leaveDate, returnDate, ticketNum;
    }
}

export default AirlineTag;