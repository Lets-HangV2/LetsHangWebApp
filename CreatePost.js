import React from 'react';
import { Portal, Dialog, Paragraph, Button, Modal, Text, TextInput, Title } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CreatePost extends React.Component{

    render(){

        return(
            <>
                <Modal visible={this.props.isBeingDisplayed} onDismiss={this.props.hideDialog}>
                    <Container>
                        <Row>
                            <Col>
                                <Title>Create a Trip!</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextInput label="location" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextInput label="Start Date" />
                            </Col>
                            <Col>
                                <TextInput label="End Date" />
                            </Col>
                        </Row>
                        <Button mode="contained">Submit</Button>
                    </Container>
                </Modal>
            </>
        );

    }

    _showModal =()=>{
        this.setState({visible: true});
    }

    _hideModal =()=>{
        this.setState({visible: false});
    }

}

export default CreatePost;