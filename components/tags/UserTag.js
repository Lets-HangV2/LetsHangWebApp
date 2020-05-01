import React from 'react';
import { Avatar, Text, Title } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserTag = props =>{

    return(
        <>
        <hr />
        <Container>
            <Row>
                <Col md={2}><Avatar.Icon icon="camera"/></Col>
                <Col>
                    <Row>
                        <Col md={3}>
                            <Title>FIRSTNAME</Title>
                        </Col>
                        <Col md={3}>
                            <Title>LASTNAME</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text>USERNAME</Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default UserTag;