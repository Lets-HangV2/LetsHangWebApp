import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-native-paper';

class NavBar extends React.Component{
    
    render(){
        return(
            <Row className="navbar">
                <Col><h3>Lets Hang</h3></Col>
                <Col><Button mode="text" onPress={this.gotoProfile}>Profile</Button></Col>
                <Col><Button mode="text" onPress={this.gotoHome}>Home</Button></Col>
                <Col><Button mode="text" onPress={this.logout}>Logout</Button></Col>
            </Row>
        );
    }

    gotoProfile(){
        //handle going to profile
        console.log('Go to profile page');
    }

    gotoHome(){
        //Handle going to Home
        console.log('Go to home page');
    }

    logout(){
        //Handle logout
        console.log('logout');
    }
}

export default NavBar;