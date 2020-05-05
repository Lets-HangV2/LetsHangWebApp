import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Title, Divider, TextInput, Button } from 'react-native-paper';
import CustomAppbar from './CustomAppbar';
import { UserContext } from '../UserContext';
import UserTag from './tags/UserTag';

const PersonalMessage = props =>{

    const [username, setUsername] = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    const search=()=>{
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/user_serch';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'name': searchQuery
        });

        xhr.send(data);

        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                setUsers(response);
            }
        };
    }

    return(
        <Container>
            <CustomAppbar username={username} />
            <Row>
                <Col style={{textAlign: 'center'}}>
                    <Title>Messages</Title>
                </Col>
            </Row>
            <Divider />
            <Row style={{paddingTop: '24px'}}>
                <Col md={10}>
                    <TextInput placeholder="Search for a user" value={searchQuery} onChangeText={text => setSearchQuery(text)} />
                </Col>
                <Col md={2}>
                    <Button mode="outlined" onPress={search} style={{height: '100%'}}>Search</Button>
                </Col>
            </Row>
            {
                users.map(user => (
                    <Row><UserTag username={user} key={user} buttonLabel={"Send Message"} /></Row>
                ))
            }
        </Container>
    );
}

export default PersonalMessage;