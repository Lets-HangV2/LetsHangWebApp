import React, { useContext, useState } from 'react';
import { Title, Avatar, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TravelPost from './posts/TravelPost';
import CustomAppbar from './CustomAppbar';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Profile = (props) =>{

    let history = useHistory();
    const [username, setUsername] = useContext(UserContext);

    const openFriendsList=()=>{
        history.push('/friends');
    }

    const openMessages=()=>{
        history.push('/messages');
    }

    const renderTravelPosts=()=>{
        console.log('rendering tavel posts...');
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/home';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': username
        });

        xhr.send(data);

        if(xhr.status == 200){
            const response = JSON.parse(xhr.responseText);
            console.log(response);
        }
        
        return(
            <TravelPost />
        );
    }

    if(username !== null){
        return(
            <Container>
                <Row>
                    <Col>
                        <h1>Unauthorized Access :(</h1>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return(
            <Container>
                <Row>
                    <CustomAppbar username={username} />
                </Row>
                <Row className="normal-row">
                    <Col>
                        <Avatar.Image size={128} />
                    </Col>
                </Row>
                <Row className="normal-row">
                    <Col md={8}>
                        <Title>{username}</Title>
                    </Col>
                    <Col md={2}>
                        <Button mode="outlined" onPress={openFriendsList}>Friends</Button>
                    </Col>
                    <Col md={2}>
                        <Button mode="contained" onPress={openMessages}>Message</Button>
                    </Col>
                </Row>
                <hr className="hr" />
                { renderTravelPosts() }
            </Container>
        );
    }
}

export default Profile;