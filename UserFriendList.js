import React from 'react';
import Container from 'react-bootstrap/Container';

class UserFriendList extends React.Component{

    state = {
        friends: []
    };

    render(){

        return(
            <Container>
                {this.renderFriends()}
            </Container>
        );

    }

    renderFriends=()=>{
        console.log('Rendering Friends');
        if(this.state.friends.length == 0){
            return(
                <p>No friends yet :( ... Why don't you add some?</p>
            );
        } else {
            return (
                this.state.friends.map(friends => <Row><Col>{ userTag }</Col></Row>)
            );
        }
    }

}

export default UserFriendList;