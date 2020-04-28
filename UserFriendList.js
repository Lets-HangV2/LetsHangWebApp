import React from 'react';
import Container from 'react-bootstrap/Container';
import UserTag from './UserTag.js';

class UserFriendList extends React.Component{

    state = {
        friends: [],
        username: ''
    };

    render(){

        return(
            <Container>
                <UserTag />
                <UserTag />
            </Container>
        );

    }

    renderFriends=()=>{
        console.log('Rendering Friends');
        let xhr = new XMLHttpRequest();
        let url = 'https://o3hobmlb9b.execute-api.us-east-1.amazonaws.com/dev/home';

        xhr.open('POST', url, false);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': 'Admin'
        });
        xhr.send(data);

        var friendsList = [];
        if(xhr.status == 200){
            const response = JSON.parse(xhr.responseText);
            friendsList = response['friends'];
        }


        /*if(friends.length == 0){
            return(
                <p>No friends yet :( ... Why don't you add some?</p>
            );
        } else {
            return (
                friendsList.map(friendsList => <Row><Col><p>Friend Found</p></Col></Row>)
            );
        } */
    }

}

export default UserFriendList;