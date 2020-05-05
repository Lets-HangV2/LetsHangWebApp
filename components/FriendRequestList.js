import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Text, Title } from 'react-native-paper';
import UserTag from './tags/UserTag';

const FriendRequestList = props =>{

    const [friendRequests, setFriendRequest] = useState([]);

    const renderFriendRequests=()=>{
        if(friendRequests.length == 0){
            return(
                <Text>No friend requests at this time</Text>
            );
        } else {
            return(
                <Text>Friend requests below</Text>
            );
        }
    }

    return(
        <Container>
            <Title>{props.username+'\'s Friend Requests'}</Title>
                {props.list.map(element => {
                    <UserTag username={element} />
                })}
        </Container>
    );
}

export default FriendRequestList;