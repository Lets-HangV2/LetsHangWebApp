import React from 'react';
import './styles.css';
import { Title, Text, TextInput, Button } from 'react-native-paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Register extends React.Component{

    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPass: '',
        firstNameErr: false,
        lastNameErr: false,
        emailErr: false,
        usernameErr: false,
        passwordErr: false,
        passconfErr: false,
        passwordLength: true,
        passwordMatch: true
    };
    
    render() {
        return(
            <div className="fullpage">
                <Container className="main">
                    <Row>
                        <Col md={{span:4, offset:4}}>
                            <Title>Register!</Title>
                            <TextInput error={this.state.firstNameErr} value={this.state.firstName} label='first name' onChangeText={firstName => this.setState({ firstName })}/>
                            <TextInput error={this.state.lastNameErr} value={this.state.lastName} label='last name' onChangeText={lastName => this.setState({ lastName })}/>
                            <TextInput error={this.state.emailErr} value={this.state.email} label='email' onChangeText={email => this.setState({ email })}/>
                            <TextInput error={this.state.usernameErr} value={this.state.username} label='username' onChangeText={username => this.setState({ username })}/>
                            <TextInput error={this.state.passwordErr || !this.state.passwordLength || !this.state.passwordMatch} value={this.state.password} label='password' onChangeText={password => this.setState({ password })}/>
                            <TextInput error={this.state.passconfErr || !this.state.passwordMatch} value={this.state.confirmPass} label='confirm password' onChangeText={confirmPass => this.setState({ confirmPass })}/>
                            <Button mode="contained" onPress={this.register}>Sign Up!</Button>
                            <Text>Already have an account?</Text>
                            <a href="">Login</a>
                            {(this.state.firstNameErr || this.state.lastNameErr || this.state.emailErr || this.state.usernameErr || this.state.passwordErr || this.state.passconfErr) && <p className="errorMsg">All fields must be filled out</p>}
                            {!this.state.passwordLength && <p className="errorMsg">Password is too short, must be at least 8 characters</p>}
                            {!this.state.passwordMatch && <p className="errorMsg">Passwords do not match</p>}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    register = () => {
        var isFilledOut = true;
        this.setState({firstNameErr: false});
        this.setState({lastNameErr: false});
        this.setState({emailErr: false});
        this.setState({usernameErr: false});
        this.setState({passwordErr: false});
        this.setState({passconfErr: false});

        if(this.state.firstName == ''){
            this.setState({firstNameErr: true});
            isFilledOut = false;
        }
        if(this.state.lastName == ''){
            this.setState({lastNameErr: true});
            isFilledOut = false;
        }
        if(this.state.email == ''){
            this.setState({emailErr: true});
            isFilledOut = false;
        }
        if(this.state.username == ''){
            this.setState({usernameErr: true});
            isFilledOut = false;
        }
        if(this.state.password == ''){
            this.setState({passwordErr: true});
            isFilledOut = false;
        }
        if(this.state.confirmPass == ''){
            this.setState({passconfErr: true});
            isFilledOut = false;
        }
        if(!isFilledOut){
            return;
        }
        alert('Everything is filled out :)');

        ///////// CHECK IF VALID /////////
        this.setState({passwordLength: true});
        this.setState({passwordMatch: true});
        var isValid = true;
        //Check if email is formatted correctly (LATER FEATURE)
        
        //Check if email is in use (LATER FEATURE)

        //Check if username is in use (LATER FEATURE)

        //Check if password is longer than 8 characters
        if(this.state.password.length < 8){
            this.setState({passwordLength: false});
            isValid = false;
        }
        //Check if passwords match
        if(this.state.password != this.state.confirmPass){
            this.setState({passwordMatch: false});
            isValid = false;
        }

        if(!isValid){
            alert('NOT VALID');
            return;
        }
        alert('Everything\'s Good');
        
        //ping file that handles registration
        let xhr = new XMLHttpRequest();
        let url = 'https://o3hobmlb9b.execute-api.us-east-1.amazonaws.com/dev/register';

        xhr.open('POST', url);

        xhr.setRequestHeader('Content-Type', 'application/json');

        var data = JSON.stringify({
            'username': this.state.username,
            'password': this.state.password,
            'email': this.state.email,
            'first_name': this.state.firstName,
            'last_name': this.state.lastName
        });

        xhr.send(data);

    }

}

export default Register;