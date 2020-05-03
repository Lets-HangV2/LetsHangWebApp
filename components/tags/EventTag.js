import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Title } from 'react-native-paper';

const EventTag = props =>{
    return(
        <Container>
            <hr />
            <Row>
                <Col md={2}>
                    <Avatar.Icon icon="alpha-e-box" />
                </Col>
                <Col>
                    <Row>
                        <Title>Name: {props.name}</Title>
                    </Row>
                    <Row>
                        <Title>Type: {props.type}</Title>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Title>Date: {props.date}</Title>
                    </Row>
                    <Row>
                        <Title>Location: {props.location}</Title>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Title>Cost: {props.cost}</Title>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default EventTag;