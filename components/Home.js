import React, { useContext, useState, useEffect } from 'react';
import '../styles.css';
import { TextInput, Title, Text, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useHistory } from 'react-router-dom';

const Home =()=>{

    let history = useHistory();

    const [username, setUsername] = useContext(UserContext);

    const [tempUsername, setTempUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [fillError , setFillError] = useState(false);
    const [nomatchError, setNomatchError] = useState(false);

    useEffect(()=>{
        if(username !== null){
            let url = '/profile/'+username;
            history.replace(url);
        }
    });

    const attemptLogin=()=>{

        setUsername(tempUsername);
        return;
        
        setUsernameError(false);
        setPasswordError(false);
        setFillError(false);
        setNomatchError(false);


        if(tempUsername === ''){
            setUsernameError(true);
        }
        if(password === ''){
            setPasswordError(true);
        }
        if(passwordError || usernameError){
            setFillError(true);
            return;
        }

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/login1';
        //let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/test/login1';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': tempUsername,
            'password': password
        });

        xhr.send(data);

        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                const response = JSON.parse(xhr.responseText);
                if(response.message.localeCompare('sucessful') == 0){
                    const authToken = response.token;
                    var decodedToken = parseJWT(authToken);
                    var authUsername = decodedToken.user;
                    setUsername(authUsername);
                    return;
                } else {
                    //There was an error
                    setUsernameError(true);
                    setPasswordError(true);
                    setNomatchError(true);
                }
            }
        }

    }

    const parseJWT =(token)=>{
        var base64URL = token.split('.')[1];
        var base64 = base64URL.replace(/-/g, '/');
        return JSON.parse(atob(base64));
    }



    return(
        <div className="fullpage">
            <Container>
                <Row className="main">
                    <Col md={{ span: 4, offset: 4 }}>
                        <Title>Welcome, Login!</Title>
                        <h1>{username}</h1>
                        <TextInput error={usernameError} label='Username' value={tempUsername} onChangeText={text => setTempUsername(text)} />
                        <TextInput error={passwordError} label='Password' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                        <Button mode="contained" onPress={attemptLogin}>Login</Button>
                        <Text>Don't have an account? </Text>
                        <Link to="/register">Create an account</Link>
                        { fillError && <p className="errorMsg">All fields must be filled out</p> }
                        { nomatchError && <p className="errorMsg">Username and/or password is incorrect</p> }
                    </Col>
                </Row>
            </Container>
        </div>
    );


}

export default Home;