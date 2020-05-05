import React, { useContext, useState, useEffect } from 'react';
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
    const [travelPosts, setTravelPost] = useState([]);

    useEffect(() =>{
        getUserData();
    }, []);

    const getUserData=()=>{
        console.log('rendering tavel posts...');
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/home';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': username
        });

        xhr.send(data);

        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                setTravelPost(...travelPosts, response['user_info']['events']);
            }
        };
    }

    const openFriendsList=()=>{
        history.push('/friends');
    }

    const openMessages=()=>{
        history.push('/messages');
    }

    if(username === null){
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
                <CustomAppbar username={username} />
                <Row className="normal-row">
                    <Col>
                        <Avatar.Icon size={128} icon="camera" />
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
                {travelPosts.length == 0 && <Row style={{textAlign: 'center'}}><Col><Title>No trips yet :(</Title></Col></Row>}
                { travelPosts.map(post => (
                    <TravelPost key={post} id={post}/>
                )) }
            </Container>
        );
    }
}

export default Profile;