import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Title, Button } from 'react-native-paper';
import UserFriendList from './UserFriendList.js';
import UserFriendRequest from './UserFriendRequest.js';


class FriendsList extends React.Component{

    state = {
        isDisabled1: true,
        isDisabled2: false,
    }

    render(){

        return(
            <Container>
                <Row>
                    <Col>
                        <Button mode="text" onPress={this.setDisabled} disabled={this.state.isDisabled1}>Friends</Button>
                    </Col>
                    <Col>
                        <Button mode="text" onPress={this.setDisabled} disabled={this.state.isDisabled2}>Friend Requests</Button>
                    </Col>
                </Row>
                {this.state.isDisabled1 && <UserFriendList />}
                {this.state.isDisabled2 && <UserFriendRequest />}
            </Container>
        );

    }

    setDisabled=()=>{
        this.setState({isDisabled1 : !this.state.isDisabled1});
        this.setState({isDisabled2 : !this.state.isDisabled2});
    }

}

export default FriendsList;