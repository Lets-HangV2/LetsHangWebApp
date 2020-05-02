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
            <Container>
                <hr />
                <Row>
                    <Col md={2}>
                        <Avatar.Icon icon="hotel" />
                    </Col>
                    <Col>
                        <Row>
                            <Title>Name: {this.props.name}</Title>
                        </Row>
                        <Row>
                            <Title>Location: {this.props.city}</Title>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Title>Rating: {this.props.rating}</Title>
                        </Row>
                        <Row>
                            <Title>Cost: {this.props.cost}</Title>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HotelTag;