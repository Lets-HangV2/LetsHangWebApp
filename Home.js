import React from 'react';
import { View } from 'react-native';
import { TextInput, Title, Text, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css';

class Home extends React.Component{
    
    state = {
        username: '',
        password: '',
        usernameErrCode: false,
        passwordErrCode: false,
        filledOutErr: false,
        noMatchErr: false,
        display: this.props.value
    };

    render() {
        return(
            <div className="fullpage">
                <Container>
                    <Row className="main">
                        <Col md={{ span: 4, offset: 4 }}>
                            <Title>Welcome, Login!</Title>
                            <TextInput error={this.state.usernameErrCode} label='Username' value={this.state.username} onChangeText={username => this.setState({ username })} />
                            <TextInput error={this.state.passwordErrCode} label='Password' value={this.state.password} onChangeText={password => this.setState({ password })} />
                            <Button mode="contained" onPress={this.attemptLogin}>Login</Button>
                            <Text>{"Don't have an account?"}</Text>
                            <a href="">Create an account</a>
                            { this.state.filledOutErr && <p className="errorMsg">All fields must be filled out</p> }
                            { this.state.noMatchErr && <p className="errorMsg">Username and password do not match</p> }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    attemptLogin = () => {
        var isFilled = true;
        this.setState({ filledOutErr: false });
        this.setState({ usernameErrCode: false });
        this.setState({ passwordErrCode: false });

        if(this.state.username === ''){
            this.setState({ usernameErrCode: true });
            isFilled = false;
        }
        if(this.state.password === ''){
            this.setState({ passwordErrCode: true });
            isFilled = false;
        }
        if(!isFilled){
            this.setState({ filledOutErr: true });
            return;
        }

        let xhr = new XMLHttpRequest();
        let url = 'https://o3hobmlb9b.execute-api.us-east-1.amazonaws.com/dev/login';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': this.state.username,
            'password': this.state.password
        });

        console.log('sending data');
        xhr.send(data);

        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                let response = JSON.parse(xhr.responseText);
                alert(xhr.responseText);s
            }
        }
        //Attempt Login
        //If user doesn't exist -> noMatchErr = true;
        //If user does exist -> send them to personal profile page

    }

}

export default Home;