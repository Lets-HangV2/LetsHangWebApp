import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Button, Title } from 'react-native-paper';

const AirlineTag = props =>{

    const searchFlight=()=>{
        var origin, dest, leaveDate, returnDate, ticketnum;
    }

    return(
        <Container onClick={searchFlight}>
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
                    <Row>
                        <Title>Cost: </Title>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AirlineTag;