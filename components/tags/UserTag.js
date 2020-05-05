import React, { useState, useEffect } from 'react';
import { Avatar, Text, Title, Button, Divider } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserTag = props =>{

    /*const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect(() =>{
        getUserData;
    }, [])

    const getUserData=()=>{
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/home';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': props.username
        });

        xhr.send(data);

        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                setFirstname(response['user_info']['firstname']);
                setLastname(response['user_info']['lastname']);
            }
        };
    }*/

    return(
        <>
        <Container style={{"marginTop": "25px", "marginBottom": "25px", "fontSize": "20px"}}>
            <Divider />
            <Row>
                <Col md={2}><Avatar.Icon icon="camera"/></Col>
                <Col>
                    <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>{props.username}</Title>
                    </Row>
                    <Row>
                        <Button mode="contained" >{props.buttonLabel}</Button>
                        {props.isPending && <Button mode="contained" >Decline Friend</Button>}
                    </Row>
                </Col>
            </Row>
            <Divider />
        </Container>
        </>
    );
}

export default UserTag;