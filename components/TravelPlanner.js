import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AirlineTag from './tags/AirlineTag';
import HotelTag from './tags/HotelTag';
//import SubEvent from './SubEvent.js';
import { View } from 'react-native';
import { Button, Checkbox, Paragraph, Portal, Dialog, TextInput, Title} from 'react-native-paper';
import CustomAppbar from './CustomAppbar';
import { UserContext } from '../UserContext';

const TravelPlanner =()=>{

    const [username, setUsername] = useContext(UserContext);

    const [eventId, setEventId] = useState('');
    const [tripName, setTripName] = useState('TRIP NAME NOT FOUND');
    const [flights, setFlight] = useState([]);
    const [hotels, setHotel] = useState([]);
    const [events, setEvent] = useState([]);
    const [potentialEvents, setPotentialEvents] = useState([]);
    const [flightVisible, setFlightVisible] = useState(false);
    const [hotelVisible, setHotelVisible] = useState(false);
    const [eventVisible, setEventVisible] = useState(false);
    const [hotelText, setHotelText] = useState('');
    const [eventText, setEventText] = useState('');
    const [eventDate, setEventDate] = useState('');

    const _showFlightDialog =()=>{setFlightVisible(true);}
    const _hideFlightDialog =()=>{setFlightVisible(false);}

    const _showHotelDialog =()=>{setHotelVisible(true);}
    const _hideHotelDialog =()=>{setHotelVisible(false);}

    const _showEventDialog =()=>{setEventVisible(true);}
    const _hideEventDialog =()=>{setEventVisible(false);}

    const _findEvents =()=>{
        var that = this;

        console.log('TRYING TO GET EVENTS');
        console.log(potentialEvents);

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/getEvents';

        xhr.open('POST', url);
        console.log('OPENING: ', xhr.status);

        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            'address': eventText,
            'date': eventDate
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
                let response = JSON.parse(xhr.responseText);

                for(var i = 0; i <response.events.length; i++){
                    response['events'][i]['key'] = i;
                }

                setPotentialEvents(response['events']);
                console.log(potentialEvents);
            }
        }
    }

    const addEvent=(key)=>{
        event = potentialEvents[key];
        console.log(event);
    }

    const renderEvents=()=>{
        return potentialEvents.map(event =>{
            
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

    return(
        <Container>
            <CustomAppbar username={username} />
            <Row>
                <Col>
                    <h1>This is the picture area</h1>
                </Col>
            </Row>
            <Row>
                <Col className="eventButton" md={2}>
                    <Button icon="plus" mode="contained" onPress={_showFlightDialog}>
                        Add Flight
                    </Button>
                    <Portal>
                        <Dialog visible={flightVisible} onDismiss={_hideFlightDialog}>
                            <Dialog.Title>Find Flight</Dialog.Title>
                            <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                            <Button onPress={_hideFlightDialog}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Col>
                <Col className="eventButton" md={2}>
                    <Button icon="plus" mode="contained" onPress={_showHotelDialog}>
                        Add Hotel
                    </Button>
                    <Portal>
                        <Dialog visible={hotelVisible} onDismiss={_hideHotelDialog}>
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
                                        value={hotelText}
                                        onChangeText={hotelText => this.setState({ hotelText })}
                                    />
                                </Col>
                                <Col md={3}>
                                    <TextInput
                                        label='Enter Date'
                                        value={hotelText}
                                        onChange
                                        Text={text => this.setState({ hotelText })}
                                    />
                                </Col>
                                <Col md={3}>
                                <Button icon="search" mode="contained" onPress={_showHotelDialog}>
                                    Search Hotels
                                </Button>
                                </Col>
                            </Row>
                            </Dialog.Content>
                            <Dialog.Actions>
                            <Button onPress={_hideHotelDialog}>Add</Button>
                            </Dialog.Actions>
                            </Container>
                        </Dialog>
                    </Portal>
                </Col>
                <Col className="eventButton" md={2}>
                    <Button icon="plus" mode="contained" onPress={_showEventDialog}>
                        Add Events
                    </Button>
                    <View>
                    <Portal>
                        <Dialog visible={eventVisible} onDismiss={_hideEventDialog}>
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
                                        value={eventText}
                                        onChangeText={eventText => this.setState({ eventText })}
                                    />
                                </Col>
                                <Col md={3}>
                                    <TextInput
                                        label='Enter Date'
                                        value={eventDate}
                                        onChangeText={eventDate => this.setState({ eventDate })}
                                    />
                                </Col>
                                <Col md={3}>
                                <Button icon="" mode="contained" onPress={_findEvents}>
                                    Search Events
                                </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {potentialEvents.length > 0 &&
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
                            <Button onPress={_hideEventDialog}>Close</Button>
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

export default TravelPlanner;