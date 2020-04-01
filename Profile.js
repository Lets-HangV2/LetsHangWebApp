import React from 'react';
import { TextInput, Title, Text, Avatar, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './ProfileCard.js';
import TravelPost from './TravelPost.js';
import NavBar from './NavBar.js';

class Profile extends React.Component{

    state = {
        travelPostArr: [<TravelPost />, <TravelPost />, <TravelPost />],
        username: 'NO USERNAME FOUND'
    }

    render() {
        return(
            <Container>
                <NavBar />
                <Row className="colorBuffer" />
                <Row>
                    <Col>
                        <Avatar.Image size={128}/>
                    </Col>
                    <Col>
                        <Row>
                            <h1>{this.state.username}</h1>
                        </Row>
                        <Row>
                            <Button mode="text" onClick="">Friends</Button>
                        </Row>
                    </Col>
                </Row>
                <hr />
                { this.renderTravelPosts() }
            </Container>
        );
    }

    renderTravelPosts =()=>{
        console.log('rendering travel posts...');
        if(this.state.travelPostArr.length === 0){
            return <p>No travel posts yet :(</p>
        } else {
            return this.state.travelPostArr.map(TravelPostArr => <Row><Col>{ TravelPostArr }</Col></Row>)
        }
    }

    openFriendsList =()=>{
        console.log('opening friends list...');
    }

}

export default Profile;