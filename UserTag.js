import React from 'react';
import { Avatar, Text, Title } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class UserTag extends React.Component{

    state={
        username: this.getUsername,
        firstname: this.getFirstname,
        lastname: this.getLastname
    }

    render(){
        return(
            <Container>
                <hr />
                <Row>
                    <Col md={2}><Avatar.Icon icon="user"/></Col>
                    <Col>
                        <Row>
                            <Col md={3}>
                                <Title>{this.state.firstname}FIRSTNAME</Title>
                            </Col>
                            <Col md={3}>
                                <Title>{this.state.lastname}LASTNAME</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>{this.state.username}USERNAME</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    getUsername=()=>{
        var username = 'username';
        return username;
    }

    getFirstname=()=>{
        var firstname = 'Firstname';
        return firstname;
    }

    getLastname=()=>{
        var lastname = 'Lastname';
        return lastname;
    }

}

export default UserTag;