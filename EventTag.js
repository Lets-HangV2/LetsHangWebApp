import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Avatar, Title } from 'react-native-paper';

class EventTag extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container>
                <hr />
                <Row>
                    <Col md={2}>
                        <Avatar.Icon icon="alpha-e-box" />
                    </Col>
                    <Col>
                        <Row>
                            <Title>Name: {this.props.name}</Title>
                        </Row>
                        <Row>
                            <Title>Type: {this.props.type}</Title>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Title>Date: {this.props.date}</Title>
                        </Row>
                        <Row>
                            <Title>Location: {this.props.location}</Title>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Title>Cost: {this.props.cost}</Title>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default EventTag;