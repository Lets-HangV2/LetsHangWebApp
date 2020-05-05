import React, { useState } from 'react';
import { Title } from 'react-native-paper';
import UserTag from './tags/UserTag';
import Container from 'react-bootstrap/Container';

const FriendList = props =>{

    const friends = useState([]);

    const renderFriends=()=>{
        console.log('Rendering Friends...');
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/home';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': 'USERNAME' //Fix this
        });
        xhr.send(data);

        if(xhr.status == 200){
            const response = JSON.parse(xhr.responseText);
            friendsList = response.friends;
        }

        if(friends.length == 0){
            return(
                <Title>No friends yet :( ... why don't you add some?</Title>
            );
        }
    }

    return(
        <Container style={{textAlign: 'center'}}>
            <Title>{props.username+'\'s Friends'}</Title>
            {props.list.map(element => {
                <UserTag key={element} username={element} buttonLabel={"Remove Friend"} />
            })}
        </Container>
    );
}

export default FriendList;