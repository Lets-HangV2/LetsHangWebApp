import React from 'react';
import './styles.css';
import FormTextBox from './FormTextBox';
import SubmitButton from './SubmitButton';
import { Title, Text } from 'react-native-paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Register extends React.Component{

    render() {
        return(
            <div className="fullpage">
                <Container className="main">
                    <Row>
                        <Col md={{span:4, offset:4}}>
                            <Title>Register!</Title>
                            <FormTextBox />
                            <FormTextBox />
                            <FormTextBox />
                            <FormTextBox />
                            <SubmitButton />
                            <Text>Already have an account?</Text>
                            <a href="">Login</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Register;