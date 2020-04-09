import React from 'react';
import { Portal, Dialog, Paragraph, Button, Modal, Text, TextInput, Title } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CreatePost extends React.Component{

    state={
        visible: false
    }

    render(){

        return(
            <>
                <Modal visible={this.state.visible} onDismiss={this._hideModal}>
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
                        <Row>
                            <Col>
                                <TextInput label="Invite Friends" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextInput multiline={true} editable={false} />
                            </Col>
                        </Row>
                        <Button mode="contained">Submit</Button>
                    </Container>
                </Modal>
                <Button style={{ marginTop: 30 }} onPress={this._showModal}>
                    Show
                </Button>
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