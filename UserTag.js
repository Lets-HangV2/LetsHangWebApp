import React from 'react';
import { Avatar, Text } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class UserTag extends React.Component{

    state={
        username: ''
    }

    render(){
        return(
            <Container className="userTag">
                <Row>
                    <Col><Avatar.Icon icon="folder"/></Col>
                    <Col><p>hello</p></Col>
                </Row>
            </Container>
        );
    }

}

export default UserTag;