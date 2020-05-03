import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Title } from 'react-native-paper';

const HotelTag = props =>{
    return(
        <Container>
            <hr />
            <Row>
                <Col md={2}>
                    <Avatar.Icon icon="hotel" />
                </Col>
                <Col>
                    <Row>
                        <Title>Name: {props.name}</Title>
                    </Row>
                    <Row>
                        <Title>Location: {props.city}</Title>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Title>Rating: {props.rating}</Title>
                    </Row>
                    <Row>
                        <Title>Cost: {props.cost}</Title>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default HotelTag;