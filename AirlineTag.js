import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Button, Title } from 'react-native-paper';

class AirlineTag extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container style={{"fontFamily": "'Work Sans', sans-serif", "marginTop": "25px", "marginBottom": "25px", "fontSize": "20px"}}>
                <Row>
                    <Col md={2}>
                        <Avatar.Icon icon="airplane" />
                    </Col>
                    <Col md={2}>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>From: {this.props.from}</Title>
                        </Row>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>To: {this.props.to}</Title>
                        </Row>
                    </Col>
                    <Col md={5}>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Departure: {(this.props.leave).slice(0, 10)} {(this.props.leave).slice(11, 16)}</Title>
                        </Row>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Arrival: {(this.props.arrive).slice(0, 10)} {(this.props.arrive).slice(11, 16)}</Title>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Cost: ${this.props.cost}</Title>
                    </Col>
                </Row>
            </Container>
        );
    }

    searchFlight=()=>{
        var origin, dest, leaveDate, returnDate, ticketNum;
    }
}

export default AirlineTag;