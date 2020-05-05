import React, { useState } from 'react';
import { Button, Modal, TextInput, Title, Dialog } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const CreatePost = props =>{

    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const createPost=()=>{
        var nestedProps = props;

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/createPlan';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': props.username,
            'name': title,
            'startDate': startDate,
            'endDate': endDate
        });

        console.log('Sending data...');
        xhr.send(data);

        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                console.log(response.message);
                nestedProps.hideDialog;
                props.checkUpdate;
            }
        };        

    }

    return(
        <>
            <Dialog visible={props.isBeingDisplayed} onDismiss={props.hideDialog} style={{width: '25vw', marginLeft: '37vw'}}>
                <Dialog.Title>Create a Trip!</Dialog.Title>
                <Dialog.Content>
                    <TextInput label="Title" value={title} onChangeText={text => setTitle(text)} />
                    <TextInput label="Start Date" value={startDate} onChangeText={text => setStartDate(text)} />
                    <TextInput label="End Date" value={endDate} onChangeText={text => setEndDate(text)} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={createPost}>Create</Button>
                    <Button onPress={props.hideDialog}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    );
}

export default CreatePost;