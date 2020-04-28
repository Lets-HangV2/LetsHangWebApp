import React from 'react';
import { Title, Avatar, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TravelPost from './TravelPost.js';

class Profile extends React.Component{

    state = { 
        travelPostArr: [<TravelPost />, <TravelPost />, <TravelPost />],
        username: this.props.username,
        userID: this.props.userID
    };

    render() {
        return(
            <>
                {this.checkAuth()}
            </>
        );
    }

    checkAuth =()=>{
        if(false){
            alert(this.props.authenticated);
            return(
                <Container>
                    <Row>
                        <Col>
                            <h1>Unauthorized Access :(</h1>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            //alert(this.props.authenticated);
            return(
                <Container>
                        <Row className="normal-row">
                            <Col>
                                <Avatar.Image size={128} />
                            </Col>
                        </Row>
                        <Row className="normal-row">
                            <Col md={8}>
                                <Title>{this.state.username}</Title>
                            </Col>
                            <Col md={2}>
                                <Button mode="outlined" onPress={this.openFriendsList}>Friends</Button>
                            </Col>
                            <Col md={2}>
                                <Button mode="contained" onPress={this.openMessages}>Message</Button>
                            </Col>
                        </Row>
                        <hr className="hr" />
                    { this.renderTravelPosts() }
                </Container>
            );
        }
    }

    getTravelPosts =()=> {
        travelPosts = [];
        return travelPosts;
    }

    getUsername(){
        return 'username';
    }

    openFriendsList =()=>{
        window.location.href = '/friends';
    }

    openMessages =()=>{
        console.log('Opening Messages');
        window.location.href = '/messages';
    }

    renderTravelPosts =()=>{
        console.log('rendering travel posts...');
        if(this.state.travelPostArr.length === 0){
            return <p>No travel posts yet :(</p>
        } else {
            return this.state.travelPostArr.map(TravelPostArr => <Row><Col>{ TravelPostArr }</Col></Row>)
        }
    }

}

export default Profile;