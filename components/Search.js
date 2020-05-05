import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { TextInput, Button } from 'react-native-paper';
import Col from 'react-bootstrap/Col';
import CustomAppbar from './CustomAppbar';
import { UserContext } from '../UserContext';

const Search =()=>{

    const [searchQuery, setSearchQuery] = useState('');
    const [username, setUsername] = useContext(UserContext);

    const search=()=>{
        console.log('Searching');
    }

    return(
        <Container>
            <CustomAppbar username={username} />
            <Row style={{paddingTop: '24px'}}>
                <Col md={10}>
                    <TextInput placeholder="Search for a user" value={searchQuery} onChangeText={text => setSearchQuery(text)} />
                </Col>
                <Col md={2}>
                    <Button mode="outlined" onPress={search} style={{height: '100%'}}>Search</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;