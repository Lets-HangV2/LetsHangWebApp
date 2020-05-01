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
                        <Title>Name: </Title>
                    </Row>
                    <Row>
                        <Title>Location: </Title>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Title>Check-in Date: </Title>
                    </Row>
                    <Row>
                        <Title>Check-out Date: </Title>
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

export default HotelTag;