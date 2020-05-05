import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Title } from 'react-native-paper';

const HotelTag = props =>{
    return(
        <Container style={{"marginTop": "25px", "marginBottom": "25px", "fontSize": "20px"}}>
            <Row>
                <Col md={2}>
                    <Avatar.Icon icon="hotel" />
                </Col>
                <Col md={6}>
                    <Row>
                        <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Name: {props.name}</Title>
                    </Row>
                    <Row>
                        <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Location: {props.city}</Title>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Title style={{"fontFamily": "'Work Sans', sans-serif", "paddingLeft": "80px"}}>Rating: {props.rating}</Title>
                    </Row>
                    <Row>
                        <Title style={{"fontFamily": "'Work Sans', sans-serif", "paddingLeft": "80px"}}>Cost: ${props.cost}</Title>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default HotelTag;