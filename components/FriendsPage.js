import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Title, Button } from 'react-native-paper';
import FriendList from './FriendList';
import CustomAppbar from './CustomAppbar';
import { UserContext } from '../UserContext';
import FriendRequestList from './FriendRequestList';

const FriendsPage =()=>{

    const [showFriends, setShowFriends] = useState(true);
    const [showRequests, setShowRequests] = useState(false);

    const [friendList, setFriendList] = useState([]);
    const [friendRequestList, setFriendRequestList] = useState([]);

    const [username, setUsername] = useContext(UserContext);

    useEffect(()=>{
        getUserFriendData();
        getFriendRequest();
    }, []);

    const setDisabled=()=>{
        setShowFriends(!showFriends);
        setShowRequests(!showRequests);
    }

    const getUserFriendData=()=>{
        console.log('getting friends');
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/home';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': username
        });
        xhr.send(data);

        xhr.onreadystatechange = processRequest;

        function processRequest(){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                alert(response);
            }
        };


    }

    const getFriendRequest=()=>{
        console.log('getting friend requests');
        let xhr = new XMLHttpRequest();
        const url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/get_friend_requests';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': username
        });

        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                console.log('friendRequest ', response);
            }
        }


    }


    return(
        <>
            <CustomAppbar username={username} />
            <Container>
                <Row>
                    <Col>
                        <Button mode="text" onPress={setDisabled} disabled={showFriends} >Friends</Button>
                    </Col>
                    <Col>
                        <Button mode="text" onPress={setDisabled} disabled={showRequests} >Friends Requests</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {showFriends && <FriendList username={username} />}
                        {showRequests && <FriendRequestList username={username} /> } 
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FriendsPage;