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
                <Row>
                    <Col md={2}>
                        <Avatar.Icon icon="alpha-e-box" />
                    </Col>
                    <Col md={4}>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Name: {this.props.name}</Title>
                        </Row>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Type: {(this.props.type).replace('_', ' ')}</Title>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Date: {(this.props.date).slice(0, 10)}</Title>
                        </Row>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif"}}>Location: {this.props.location}</Title>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Row>
                            <Title style={{"fontFamily": "'Work Sans', sans-serif", "paddingLeft": "12px"}}>Cost: ${this.props.cost}</Title>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default EventTag;