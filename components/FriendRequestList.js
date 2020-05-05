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
        <Container style={{textAlign: 'center'}}>
            <Title>{props.username+'\'s Friend Requests'}</Title>
                {props.list.map(element => {
                    <UserTag key={element} username={element} buttonLabel={"Accept Friend"} isPending={true} />
                })}
        </Container>
    );
}

export default FriendRequestList;