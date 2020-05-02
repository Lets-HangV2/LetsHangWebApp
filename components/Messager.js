import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TextInput, Button } from 'react-native-paper';
import ChatBubble from './posts/ChatBubble';

const Messager =()=>{

    const sendMessage=()=>{
        console.log("Sending message");
    }

    return(
        <Container>
            <Row>
                <Col style={{height: "80vh", border: '2px solid grey' , borderRadius: '5px' }} >
                    <h1>Chat Text Area</h1>
                </Col>
            </Row>
            <Row style={{border: '2px solid grey', borderRadius: '5px'}} >
                <Col md={10}>
                    <TextInput />
                </Col>
                <Col>
                    <Button mode="contained" onPress={sendMessage} style={{height: '100%'}} >Send</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Messager;