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
            <Container onClick={this.searchFlight}>
                <hr />
                <Row>
                    <Col md={2}>
                        <Avatar.Icon icon="airplane" />
                    </Col>
                    <Col>
                        <Row>
                            <Title>From: {this.props.from}</Title>
                        </Row>
                        <Row>
                            <Title>To: {this.props.to}</Title>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Title>Departure: {this.props.leave}</Title>
                        </Row>
                        <Row>
                            <Title>Arrival: {this.props.arrive}</Title>
                        </Row>
                    </Col>
                    <Col>
                        <Title>Cost: {this.props.cost}</Title>
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