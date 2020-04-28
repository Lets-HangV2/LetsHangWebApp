import React from 'react';
import { TextInput, Title, Text, Button } from 'react-native-paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

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
                            <TextInput error={this.state.passwordErrCode} label='Password' value={this.state.password} onChangeText={password => this.setState({ password })} secureTextEntry={true} />
                            <Button mode="contained" onPress={this.attemptLogin}>Login</Button>
                            <Text>Don't have an account? </Text>
                            <Link to="/register">Create an account</Link>
                            { this.state.filledOutErr && <p className="errorMsg">All fields must be filled out</p> }
                            { this.state.noMatchErr && <p className="errorMsg">Username and/or password is incorrect</p> }
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
        this.setState({ noMatchErr: false });

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

        //Call login function on API Gateway
        let xhr = new XMLHttpRequest();
        let url = 'https://o3hobmlb9b.execute-api.us-east-1.amazonaws.com/dev/login1';

        //Setting it to false to make it so the page waits for the response
        xhr.open('POST', url, false);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'username': this.state.username,
            'password': this.state.password
        });
        xhr.send(data);

        if(xhr.status == 200){
            const response = JSON.parse(xhr.responseText);
            if(response['message'].localeCompare('sucessful') == 0){
                const authToken = response['token'];
                var decode = this.parseJWT(authToken);
                var uid = decode['user'];
                //this.props.getUserID(uid);
                document.cookie = "username="+uid;
                this.props.getUserID();
                window.location.href = "/profile";
                return;
            }
        }
        this.setState({ usernameErrCode: true });
        this.setState({ passwordErrCode: true });
        this.setState({ noMatchErr: true });
    } //End of attemptLogin()

    parseJWT =(token)=>{
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '/');
        return JSON.parse(atob(base64));
    }

}//End of class

export default Home;