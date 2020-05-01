import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AirlineTag from './AirlineTag.js';
import HotelTag from './HotelTag.js';
//import SubEvent from './SubEvent.js';
import { View } from 'react-native';
import { Button, Checkbox, Paragraph, Portal, Dialog, TextInput, Title} from 'react-native-paper';


class TravelPlanner extends React.Component{

    state = {
        eventId: '',
        tripName: 'TRIP NAME NOT FOUND',
        flights: [],
        hotels: [],
        events: [],
        potentialEvents: [],
        flightVisible: false,
        hotelVisible: false,
        eventVisible: false,
        hotelText: '',
        eventText: '',
        eventDate: '',
    }

    _showFlightDialog = () => this.setState({ flightVisible: true });
    _hideFlightDialog = () => this.setState({ flightVisible: false });

    _showHotelDialog = () => this.setState({ hotelVisible: true });
    _hideHotelDialog = () => this.setState({ hotelVisible: false });

    _showEventDialog = () => this.setState({ eventVisible: true });
    _hideEventDialog = () => this.setState({ eventVisible: false });

    _findEvents = () =>{
        var that = this;

        console.log('TRYING TO GET EVENTS');
        console.log(this.state.potentialEvents);

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/getEvents';
        
        xhr.open('POST', url);
        console.log('OPENING: ', xhr.status);

        xhr.setRequestHeader('Content-Type', 'application/json');

        var data = JSON.stringify({
            'address': this.state.eventText,
            'date': this.state.eventDate
        });

        console.log('Sending data');
        xhr.send(data);

        xhr.onprogress = function(){
            console.log('LOADING: ', xhr.status);
        };

        xhr.onload = function(){
            console.log('DONE: ', xhr.status);
        };

        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);

                for(var i = 0; i < response['events'].length; i++){
                    response['events'][i]['key'] = i;
                }

                that.setState({
                    potentialEvents: response['events']
                });
                console.log(that.state.potentialEvents)
            }
        };

    };

    addEvent(key){
        event = this.state.potentialEvents[key];
        console.log(event)

    }

    renderEvents(){

        return this.state.potentialEvents.map(event =>{
            
            return(
                <tr id={event.key}>
                    <td>
                        <Button icon="plus" mode="contained" onPress={this.addEvent.bind(this, event.key)}>
                            Select
                        </Button>
                    </td>
                    <td>{event.name}</td>
                    <td>{event.type}</td>
                    <td>{event.date.slice(0, 10)}</td>
                    <td>{event.location}</td>
                    <td>{event.cost}</td>
                </tr>
            )
        })

    }

    render(){
        const { checked } = this.state;
        return(
        
            <Container>
                <Row>
                    <Col>
                        <h1>This is the picture area</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="eventButton" md={2}>
                        <Button icon="plus" mode="contained" onPress={this._showFlightDialog}>
                            Add Flight
                        </Button>
                        <Portal>
                            <Dialog visible={this.state.flightVisible} onDismiss={this._hideFlightDialog}>
                                <Dialog.Title>Find Flight</Dialog.Title>
                                <Dialog.Content>
                                <Paragraph>This is simple dialog</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions>
                                <Button onPress={this._hideFlightDialog}>Done</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </Col>
                    <Col className="eventButton" md={2}>
                        <Button icon="plus" mode="contained" onPress={this._showHotelDialog}>
                            Add Hotel
                        </Button>
                        <Portal>
                            <Dialog visible={this.state.hotelVisible} onDismiss={this._hideHotelDialog}>
                                <Container>
                                <Dialog.Title>
                                    <Title>
                                        Create Hotel
                                    </Title>
                                </Dialog.Title>
                                <Dialog.Content>
                                <Row>
                                    <Col md={3}>
                                        <TextInput
                                            label='Enter City'
                                            value={this.state.hotelText}
                                            onChangeText={hotelText => this.setState({ hotelText })}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <TextInput
                                            label='Enter Date'
                                            value={this.state.hotelText}
                                            onChange
                                            Text={text => this.setState({ hotelText })}
                                        />
                                    </Col>
                                    <Col md={3}>
                                    <Button icon="search" mode="contained" onPress={this._showHotelDialog}>
                                        Search Hotels
                                    </Button>
                                    </Col>
                                </Row>
                                </Dialog.Content>
                                <Dialog.Actions>
                                <Button onPress={this._hideHotelDialog}>Add</Button>
                                </Dialog.Actions>
                                </Container>
                            </Dialog>
                        </Portal>
                    </Col>
                    <Col className="eventButton" md={2}>
                        <Button icon="plus" mode="contained" onPress={this._showEventDialog}>
                            Add Events
                        </Button>
                        <View>
                        <Portal>
                            <Dialog visible={this.state.eventVisible} onDismiss={this._hideEventDialog}>
                                <Container>
                                <Dialog.Title>
                                    <Title>
                                        Create Event
                                    </Title>
                                </Dialog.Title>
                                <Dialog.Content>
                                <Row>
                                    <Col md={3}>
                                        <TextInput
                                            label='Enter City'
                                            value={this.state.eventText}
                                            onChangeText={eventText => this.setState({ eventText })}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <TextInput
                                            label='Enter Date'
                                            value={this.state.eventDate}
                                            onChangeText={eventDate => this.setState({ eventDate })}
                                        />
                                    </Col>
                                    <Col md={3}>
                                    <Button icon="" mode="contained" onPress={this._findEvents}>
                                        Search Events
                                    </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.state.potentialEvents.length > 0 &&
                                            <table id='potentialEvents'>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Date</th>
                                                        <th>Location</th>
                                                        <th>Cost</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderEvents()}
                                                </tbody>
                                            </table>
                                        }
                                    </Col>
                                </Row>
                                </Dialog.Content>
                                <Dialog.Actions>
                                <Button onPress={this._hideEventDialog}>Close</Button>
                                </Dialog.Actions>
                                </Container>
                            </Dialog>
                        </Portal>
                        </View>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AirlineTag />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <HotelTag />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>This and below, are the chosen events</h1>
                    </Col>
                </Row>
            </Container>
            
        );
    }

}

export default TravelPlanner;