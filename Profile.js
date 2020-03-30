import React from 'react';
import { TextInput, Title, Text, Avatar, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './ProfileCard.js';
import TravelPost from './TravelPost.js';

class Profile extends React.Component{

    state = {
        arr: [<TravelPost />, <TravelPost />, <TravelPost />]
    }

    render() {
        return(
            <Container>
                <Row className="tempNavbar">
                    <h1>NAVBAR</h1>
                </Row>
                <Row className="colorBuffer" />
                <Row>
                    <Col>
                        <Avatar.Image size={128}/>
                    </Col>
                    <Col>
                        <Row>
                            <h1>Username</h1>
                        </Row>
                        <Row>
                            <Button mode="text">Friends</Button>
                        </Row>
                    </Col>
                </Row>
                <hr />
                { this.renderTravelPosts() }
            </Container>
        );
    }

    renderTravelPosts(){
        if(this.state.arr.length === 0){
            return <p>No travel posts yet :(</p>
        } else {
            return this.state.arr.map(arr => <Row><Col>{ arr }</Col></Row>)
        }
    }

}

export default Profile;