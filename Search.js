import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { TextInput, Button } from 'react-native-paper';
import Col from 'react-bootstrap/Col';

class Search extends React.Component{

    state={
        userSearchQuery: ''
    }

    render(){

        return(
            <Container>
                <Row>
                    <Col md={10}>
                        <TextInput placeholder="Search for a user" onKeyPress={userSearchQuery => this.setState({ userSearchQuery })}/>
                    </Col>
                    <Col md={2}>
                        <Button mode="outlined" onPress={this.startSearch}>Search</Button>
                    </Col>
                </Row>
            </Container>
        );

    }

    startSearch=()=>{
        console.log('searching');
    }

}

export default Search;