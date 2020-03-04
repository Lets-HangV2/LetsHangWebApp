import React from 'react';
import { TextInput, Title, Text, Avatar, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './ProfileCard.js';

class Profile extends React.Component{
    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <Avatar.Image />
                    </Col>
                    <Col>
                        <h1>Username</h1>
                        <Button mode="text">Friends</Button>
                    </Col>
                </Row>
                <hr />
                <ProfileCard />
            </Container>
        );
    }
}

export default Profile;