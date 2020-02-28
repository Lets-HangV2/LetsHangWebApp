import React from 'react';
import { View } from 'react-native';
import { TextInput, Title, Text } from 'react-native-paper';
import SubmitButton from './SubmitButton.js';
import FormTextBox from './FormTextBox.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css';

class Home extends React.Component{
    
    render() {
        return(
            <div className="fullpage">
                <Container>
                    <Row className="main">
                        <Col md={{ span: 4, offset: 4 }}>
                            <Title>Welcome, Login!</Title>
                            <FormTextBox dataSent={"Username"}/>
                            <FormTextBox />
                            <SubmitButton />
                            <Text>{"Don't have an account?"}</Text>
                            <a href="">Create an account</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;