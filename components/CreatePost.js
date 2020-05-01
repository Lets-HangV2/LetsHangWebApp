import React, { useState } from 'react';
import { Button, Modal, TextInput, Title } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const CreatePost = props =>{

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const createPost=()=>{
        var nestedProps = props;

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/create_post';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'id': props.username,
            'title': title,
            'desc': desc
        });

        console.log('Sending data...');
        xhr.send(data);

        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                console.log(response.message);
                nestedProps.hideDialog;
            }
        }
        


    }

    return(
        <>
            <Modal visible={props.isBeingDisplayed} onDismiss={props.hideDialog}>
                <Container>
                    <Row>
                        <Col>
                            <Title>Create a Trip!</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextInput label="Title" onChangeText={text => setTitle(text)} />
                        </Col>
                        <Col>
                            <TextInput label="Description" onChangeText={text => setDesc(text)} />
                        </Col>
                    </Row>
                    <Button mode="contained" onPress={createPost}>Submit</Button>
                </Container>
            </Modal>
        </>
    );
}

export default CreatePost;