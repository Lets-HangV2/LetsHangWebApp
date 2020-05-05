import React, { useState } from 'react';
import '../styles.css';
import { Title, Text, TextInput, Button } from 'react-native-paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';

const Register=()=>{


    let history = useHistory();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passconfError, setPassconfError] = useState(false);
    const [passwordLength, setPasswordLength] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);


    const register=()=>{

        setFirstnameError(false);
        setLastnameError(false);
        setEmailError(false);
        setUsernameError(false);
        setPasswordError(false);
        setPassconfError(false);

        if(firstname == ''){setFirstnameError(true);}
        if(lastname == ''){setLastnameError(true);}
        if(email == ''){setEmailError(true);}
        if(username == ''){setUsernameError(true);}
        if(password == ''){setPasswordError(true);}
        if(confirmPass == ''){setPassconfError(true);}
        if(firstnameError || lastnameError || emailError || usernameError || passwordError || passconfError){
            return;
        }
        console.log('All fields are filled out :)');

        ///////// CHECK IF VALID /////////
        setPasswordLength(true);
        setPasswordMatch(true);
        //Check if email is formatted correctly (LATER FEATURE)
        
        //Check if email is in use (LATER FEATURE)

        //Check if username is in use (LATER FEATURE)

        if(password.length < 8){setPasswordLength(false);}
        if(password != confirmPass){setPasswordMatch(false);}

        if(!passwordLength || !passwordMatch){
            console.log('Invalid Entry');
            return;
        }
        console.log('Everything\'s Valid');
        
        //ping file that handles registration
        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/register1';

        xhr.open('POST', url);

        xhr.setRequestHeader('Content-Type', 'application/json');

        var data = JSON.stringify({
            'username': username,
            'password': password,
            'email': email,
            'first_name': firstname,
            'last_name': lastname
        });
        
        console.log('Sending data');
        xhr.send(data);

        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                if(response['status'].localeCompare('Sucessful') == 0){
                    history.replace('/');
                } else {
                    console.log('ERROR RESPONSE: ', response['status']);
                }
            }
        };
    }

    return(
        <div className="fullpage">
            <Container className="main">
                <Row>
                    <Col md={{span:4, offset:4}}>
                        <Title>Register!</Title>
                        <TextInput error={firstnameError} value={firstname} label='first name' onChangeText={text => setFirstname(text)}/>
                        <TextInput error={lastnameError} value={lastname} label='last name' onChangeText={text => setLastname(text)}/>
                        <TextInput error={emailError} value={email} label='email' onChangeText={text => setEmail(text)}/>
                        <TextInput error={usernameError} value={username} label='username' onChangeText={text => setUsername(text)}/>
                        <TextInput error={passwordError || !passwordLength || !passwordMatch} value={password} label='password' onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                        <TextInput error={passconfError || !passwordMatch} value={confirmPass} label='confirm password' onChangeText={text => setConfirmPass(text)} secureTextEntry={true}/>
                        <Button mode="contained" onPress={register}>Sign Up!</Button>
                        <Text>Already have an account? </Text>
                        <Link to="/">Login</Link>
                        {(firstnameError || lastnameError || emailError || usernameError || passwordError || passconfError ) && <p className="errorMsg">All fields must be filled out</p>}
                        {!passwordLength && <p className="errorMsg">Password is too short, must be at least 8 characters</p>}
                        {!passwordMatch && <p className="errorMsg">Passwords do not match</p>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;