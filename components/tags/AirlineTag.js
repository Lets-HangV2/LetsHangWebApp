import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Button, Title } from 'react-native-paper';

const AirlineTag = props =>{

    return(
        <Container style={{"fontFamily": "'Work Sans', sans-serif", "marginTop": "25px", "marginBottom": "25px", "fontSize": "20px"}}>
            <Row>
                <Col md={2}>
                    <Avatar.Icon icon="airplane" />
                </Col>
                <Col md={2}>
                    <Row>
                        <Title  style={{"fontFamily": "'Work Sans', sans-serif"}} >From: {props.from}</Title>
                    </Row>
                    <Row>
                        <Title  style={{"fontFamily": "'Work Sans', sans-serif"}}>To: {props.to}</Title>
                    </Row>
                </Col>
                <Col md={5}>
                    <Row>
                        <Title  style={{"fontFamily": "'Work Sans', sans-serif"}}>Departure: {props.leave.slice(0, 10)} {props.leave.slice(11, 16)}</Title>
                    </Row>
                    <Row>
                        <Title  style={{"fontFamily": "'Work Sans', sans-serif"}}>Arrival: {props.arrive.slice(0, 10)} {props.arrive.slice(11, 16)}</Title>
                    </Row>
                </Col>
                <Col md={2}>
                    <Row>
                        <Title  style={{"fontFamily": "'Work Sans', sans-serif"}}>Cost: ${props.cost}</Title>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AirlineTag;