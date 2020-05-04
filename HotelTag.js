import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Title } from 'react-native-paper';

class HotelTag extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container style={{"marginTop": "25px", "marginBottom": "25px", "fontSize": "20px"}}>
                <Row>
                    <Col md={2}>
                        <Avatar.Icon icon="hotel" />
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Name: {this.props.name}</Title>
                        </Row>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Location: {this.props.city}</Title>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif", "paddingLeft": "80px"}}>Rating: {this.props.rating}</Title>
                        </Row>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif", "paddingLeft": "80px"}}>Cost: ${this.props.cost}</Title>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HotelTag;