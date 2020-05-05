import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TextInput, Button, Divider, Title } from 'react-native-paper';
import ChatBubble from './posts/ChatBubble';
import { ScrollView } from 'react-native';

const Messager =props=>{

    //const [planID, setPlanID] = useState(props.planID);
    const [message, setMessage] = useState('');
    const [messagesContent, setMessagesContent] = useState([]);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages=()=>{
        console.log('Getting messages');
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/get_messages';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'event_id': props.planID
        });

        xhr.send(data);

        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var chat = [];
                const response = JSON.parse(xhr.responseText);
                console.log(response.length);
                for(var i=0; i<response.length; i++){
                    chat[i] = response[i]['content'];
                }
                setMessagesContent(...messagesContent, chat);
                //setMessages(...messages, response[])
            }
        };
    }

    const sendMessage=()=>{
        console.log("Sending message");
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/send_message';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'event_id': props.planID,
            'username': props.username,
            'message': message
        });

        xhr.send(data);

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                setMessagesContent(...messagesContent, response[0]['content']);
            }
        };

        setMessage('');
    }

    return(
        <>
            <Row style={{borderBottomStyle: 'solid', borderBottomWidth: '2px'}}>
                <Col style={{textAlign: 'center'}}>
                    <h1>Chat</h1>
                </Col>
            </Row>
            <Divider />
            <ScrollView>
            <Row>
                <Col style={{minHeight: '80vh', maxHeight: '80vh', marginTop: '24px' }} >
                    {
                        messagesContent.map(singleMessage => (
                            <ChatBubble content={singleMessage} />
                        ))
                    }
                </Col>
            </Row>
            </ScrollView>
            <Row style={{paddingBottom: '24px', marginRight: '0px'}} >
                <Col md={10}>
                    <TextInput value={message} onChangeText={text => setMessage(text)} multiline={true} placeholder="Message..." />
                </Col>
                <Col>
                    <Button mode="contained" onPress={sendMessage} style={{height: '100%'}} >Send</Button>
                </Col>
            </Row>
        </>
    );
}

export default Messager;