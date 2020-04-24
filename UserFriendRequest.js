import React from 'react';
import Container from 'react-bootstrap/Container';
import UserTag from './UserTag';

class UserFriendRequest extends React.Component{

    state={
        friendRequests: []
    }

    render(){

        return(
            <Container>
                {this.renderFriendRequests()}
            </Container>
        );

    }

    renderFriendRequests=()=>{
        if(this.state.friendRequests.length == 0){
            return(
                <p>No friend requests at this time</p>
            );
        } else {
            return(
                this.state.friendRequests.map(friendRequests => <Row><Col>{ UserTag }</Col></Row>)
            );
        }
    }

}

export default UserFriendRequest;