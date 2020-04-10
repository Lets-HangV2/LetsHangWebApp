import React from 'react';
import { Title, Avatar, Button} from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TravelPost from './TravelPost.js';
import CustomAppbar from './CustomAppbar.js';

class Profile extends React.Component{

    state = { 
        travelPostArr: [<TravelPost />, <TravelPost />, <TravelPost />],
        username: this.getUsername()
    }

    render() {
        return(
            <>
                {this.checkAuth()}
            </>
        );
    }

    checkAuth =()=>{
        if(false){
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
            return(
                <Container>
                    <CustomAppbar />
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
                                <Button mode="outlined" onClick={this.openFriendsList}>Friends</Button>
                            </Col>
                            <Col md={2}>
                                <Button mode="contained" onClick={this.openMessages}>Message</Button>
                            </Col>
                        </Row>
                        <hr className="hr" />
                    { this.renderTravelPosts() }
                </Container>
            );
        }
    }

    getUsername(){
        return 'username';
    }

    openFriendsList =()=>{
        alert('Open friends list');
    }

    openMessages =()=>{
        alert('Open messages');
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