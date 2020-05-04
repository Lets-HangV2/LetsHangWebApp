import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AirlineTag from './tags/AirlineTag';
import HotelTag from './tags/HotelTag';
import EventTag from './tags/EventTag';
import { View } from 'react-native';
import { Button, Checkbox, Paragraph, Portal, Dialog, TextInput, Title} from 'react-native-paper';
import CustomAppbar from './CustomAppbar';
import { UserContext } from '../UserContext';
import Messager from './Messager';

const TravelPlanner =()=>{

    const [username, setUsername] = useContext(UserContext);

    const [planID, setplanID] = useState('f977b1bb-9c4a-4b44-9f52-f205735b37c1');
    const [tripName, setTripName] = useState('TRIP NAME NOT FOUND');

    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [events, setEvents] = useState([]);

    const [airportCity1, setAirportCity1] = useState([]);
    const [airportCity2, setAirportCity2] = useState([]);
    const [airport1Name, setAirport1Name] = useState('');
    const [airport1IataCode, setAirport1IataCode] = useState('');
    const [airport2Name, setAirport2Name] = useState('');
    const [airport2IataCode, setAirport2IataCode] = useState('');
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [numPassengers, setNumPassengers] = useState('');
    const [pickedFlights, setPickedFlights] = useState([]);
    const [potentialEvents, setPotentialEvents] = useState([]);
    const [flightVisible, setFlightVisible] = useState(false);
    const [hotelVisible, setHotelVisible] = useState(false);
    const [eventVisible, setEventVisible] = useState(false);

    const [hotelText, setHotelText] = useState('');
    const [eventText, setEventText] = useState('');
    const [eventDate, setEventDate] = useState('');

    const [flyingFrom, setFlyingFrom] = useState('');
    const [flyingTo, setFlyingTo] = useState('');
    const [potentialHotels, setPotentialHotels] = useState([]);

    useEffect(() => {
        console.log('Here');
        getPlanData();
    }, []);

    const _showFlightDialog =()=>{setFlightVisible(true);}
    const _hideFlightDialog =()=>{setFlightVisible(false);}

    const _showHotelDialog =()=>{setHotelVisible(true);}
    const _hideHotelDialog =()=>{setHotelVisible(false);}

    const _showEventDialog =()=>{setEventVisible(true);}
    const _hideEventDialog =()=>{
        setEventVisible(false);
        setPotentialEvents([]);
    }

    const getPlanData =()=>{

        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/getPlanDetails';
        let xhr = new XMLHttpRequest();

        let data = JSON.stringify({
            'planID': planID
        });

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                let response = JSON.parse(xhr.responseText);
                console.log(response);
                setEvents(...events, response[0]['events']);
                setHotels(...hotels, response[0]['hotel']);
                setFlights(...flights, response[0]['airfare']);
            }
        };
    }

    const renderAirport1=()=>{
        return (airportCity1.map(airport =>{
            return(
                <tr>
                    <td>
                        <Button icon="plus" mode="contained" onPress={addAirport(airport.key, 'airport1')}>
                            Pick
                        </Button>
                    </td>
                    <td>{airport.name}</td>
                </tr>
            )
        }));
    }

    const renderAirport2=()=>{
        return (airportCity2.map(airport =>{
            return(
                <tr>
                    <td>
                        <Button icon="plus" mode="contained" onPress={addAirport(airport.key, 'airport2')}>
                            Pick
                        </Button>
                    </td>
                    <td>{airport.name}</td>
                </tr>
            )
        }));
    }

    const renderEvents=()=>{
        return (potentialEvents.map(event =>{
            return(
                <tr id={event.key}>
                    <td>
                        <Button icon="plus" mode="contained" onPress={addEvent(event.key)}>
                            Select
                        </Button>
                    </td>
                    <td>{event.name}</td>
                    <td>{event.type}</td>
                    <td>{event.date.slice(0, 10)}</td>
                    <td>{event.location}</td>
                    <td>{event.cost}</td>
                </tr>
            );
        }));
    }

    const renderHotels=()=>{
        return (potenialHotels.map(hotel =>{

            return(
                <tr>
                    <td>
                        <Button icon="plus" mode="contained" onPress={addHotel(hotel.key)}>
                            Select
                        </Button>
                    </td>
                    <td>{hotel.name}</td>
                    <td>{hotel.rating}</td>
                    <td>{hotel.city}</td>
                    <td>{hotel.cost}</td>
                </tr>
            )
        }));
    }

    const addHotel=(key)=>{
        var data = JSON.stringify({
            'planID': planID,
            'hotel': potenialHotels[key]
        });

        console.log(data)

        var url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/addHotel';
        let xhr = new XMLHttpRequest();

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);

                console.log(response);
            }
        };

        var duplicateList = [...potenialHotels];
        duplicateList.splice(key, 1);
        setPotentialHotels(duplicateList);
        getPlanData;

    }

    const addAirport = (key, airport) =>{
        if(airport == 'airport1'){
            var airport = airportCity1[key];
            setAirport1Name(airport.name);
            setAirport1IataCode(airport.iataCode);
        }else{
            var airport = airportCity2[key];
            setAirport2Name(airport.name);
            setAirport2IataCode(airport.iataCode);
        }
    }

    const _findEvents = () =>{

        var data = JSON.stringify({
            'address': eventText,
            'date': eventDate
        });

        console.log('TRYING TO GET EVENTS');
        console.log(potentialEvents);

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/getEvents';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);

                for(var i = 0; i < response['events'].length; i++){
                    response['events'][i]['key'] = i;
                }

                setPotentialEvents(response['events']);

                console.log(potentialEvents)
            }
        };

    }

    const addEvent=(key)=>{

        var plan_id = planID;
        var event = potentialEvents[key];

        var data = JSON.stringify({
            'planID': plan_id,
            'event': event
        });

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/addEvent';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);

                console.log(response);
            }
        };

        var duplicateList = [...potentialEvents];
        duplicateList.splice(key, 1);
        setPotentialEvents(duplicateList);
        getPlanData;

    }

    const findAirports = () => {

        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/find_airports';
        let xhr = new XMLHttpRequest();

        var data = JSON.stringify({
            'city1': flyingFrom,
            'city2': flyingTo
        });

        console.log(data);

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);

                for(var i = 0; i < response['airports1'].length; i++){
                    response['airports1'][i]['key'] = i;
                }

                for(var i = 0; i < response['airports2'].length; i++){
                    response['airports2'][i]['key'] = i;
                }

                setAirportCity1(response['airports1']);
                setAirportCity2(response['airports2']);
            }
        };

    }

    const getFlights=()=>{

        var data = JSON.stringify({
            "origin": airport1IataCode,
            "destination": airport2IataCode,
            "leave_date": date1,
            "back_date": date2,
            "numAdults": numPassengers
        });

        console.log(data);

        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/get_flight';
        let xhr = new XMLHttpRequest();

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                setPickedFlights([response.to, response.back]);
                console.log(pickedFlights);
            }
        };

    }

    const addFlightToPlan=()=>{

        var plan_id = planID;
        var flight = pickedFlights;

        var data = JSON.stringify({
            'planID': plan_id,
            'flight': flight
        });

        console.log(data);

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/addFlight';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                console.log(response);
            }
        };

        setPickedFlights([]);
        getPlanData;
    }

    const clearFlights=()=>{setPickedFlights([]);}

    const findHotels=()=>{

        var data = JSON.stringify({
            "city": hotelText
        });

        console.log(data);

        let xhr = new XMLHttpRequest();
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/findHotels';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                for(var i = 0; i < response['hotels'].length; i++){
                    response['hotels'][i]['key'] = i;
                }

                setPotentialHotels(response['hotels']);
                console.log(potenialHotels);
            }
        };

    }


    return(
        <Container>
            <CustomAppbar username={username} />
            <Row>
                <Col>
                    <h1>{tripName}</h1>
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
                                <Row>
                                    <Col md={12}>
                                        <Title>Find Airport</Title>
                                    </Col>
                                    <Col md={4}>
                                        <Row>
                                            <Col md={8}>
                                                <TextInput
                                                    label='Flying From'
                                                    value={flyingFrom}
                                                    onChangeText={text => setFlyingFrom(text)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop: '40px'}}>
                                            <Col md={8}>
                                                <TextInput
                                                    label='Flying To'
                                                    value={flyingTo}
                                                    onChangeText={text => setFlyingTo(text)}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Button mode="contained" onPress={findAirports}>Search</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={4}>
                                        {airportCity1.length > 0 &&
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Airport</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderAirport1}
                                                </tbody>
                                            </table>
                                        }
                                    </Col>
                                    <Col md={4}>     
                                        {airportCity2.length > 0 &&
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Airport</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderAirport2}
                                                </tbody>
                                            </table>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Title>Find Flight</Title>
                                    </Col>
                                    <Col md={4}>
                                        <TextInput
                                            label='Origin'
                                            value={airport1Name}
                                            onChangeText={text => setAirport1Name(text)}
                                        />   
                                    </Col>
                                    <Col md={4}>
                                        <TextInput
                                            label='Departing'
                                            value={date1}
                                            onChangeText={text => setDate1(text)}
                                        />   
                                    </Col>
                                    <Col md={4}>
                                        <TextInput
                                            label='# of Passengers'
                                            value={numPassengers}
                                            onChangeText={text => setNumPassengers(text)}
                                        />   
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <TextInput
                                            label='Destination'
                                            value={airport2Name}
                                            onChangeText={text => setAirport2Name(text)}
                                        />   
                                    </Col>
                                    <Col md={4}>
                                        <TextInput
                                            label='Returning'
                                            value={date2}
                                            onChangeText={text => setDate2(text)}
                                        />   
                                    </Col>
                                    <Col md={4}>
                                    <Button mode="contained" onPress={getFlights}>Get Flight</Button>  
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {pickedFlights.length > 0 &&
                                        <>
                                            <Row>
                                                <Col md={12}>
                                                    Cheapest Flight Found
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={5}>
                                                    From: {pickedFlights[0].ARV.iataCode}, Terminal:  {pickedFlights[0].ARV.terminal}
                                                </Col>
                                                <Col md={4}>
                                                    Date: {pickedFlights[0].ARV.at}
                                                </Col>
                                                <Col md={3}>
                                                    Cost: {pickedFlights[0].Cost}
                                                </Col>
                                                <Col md={5}>
                                                    To: {pickedFlights[0].DRP.iataCode}, Terminal:  {pickedFlights[0].DRP.terminal}
                                                </Col>
                                                <Col md={4}>
                                                    Date: {pickedFlights[0].DRP.at}
                                                </Col>
                                                <Col md={3}>
                                                    Airline: {pickedFlights[0].Airline[0]}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={5}>
                                                    From: {pickedFlights[1].ARV.iataCode}, Terminal:  {pickedFlights[1].ARV.terminal}
                                                </Col>
                                                <Col md={4}>
                                                    Date: {pickedFlights[1].ARV.at}
                                                </Col>
                                                <Col md={3}>
                                                    Cost: {pickedFlights[1].Cost}
                                                </Col>
                                                <Col md={5}>
                                                    To: {pickedFlights[1].DRP.iataCode}, Terminal:  {pickedFlights[1].DRP.terminal}
                                                </Col>
                                                <Col md={4}>
                                                    Date: {pickedFlights[1].DRP.at}
                                                </Col>
                                                <Col md={3}>
                                                    Airline: {pickedFlights[1].Airline[0]}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={3}>
                                                    <Button mode="contained" onPress={addFlightToPlan}>Add Flight</Button>
                                                </Col>
                                                <Col md={3}>
                                                    <Button mode="contained" onPress={clearFlights}>Clear</Button>
                                                </Col>
                                            </Row>
                                        </>
                                        }
                                    </Col>
                                </Row>
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
                                        onChangeText={text => setHotelText(text)}
                                    />
                                </Col>
                                <Col md={3}>
                                <Button mode="contained" onPress={findHotels}>
                                    Search Hotels
                                </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {potentialHotels.length > 0 &&
                                        <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Rating</th>
                                                <th>City</th>
                                                <th>Cost Per Night</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderHotels}
                                        </tbody>
                                    </table>
                                    }
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
                                        onChangeText={text => setEventText(text)}
                                    />
                                </Col>
                                <Col md={3}>
                                    <TextInput
                                        label='Enter Date'
                                        value={eventDate}
                                        onChangeText={text => setEventDate(text)}
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
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Date</th>
                                                    <th>Location</th>
                                                    <th>Cost</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderEvents}
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
                    {flights.map(flight=>(
                        <AirlineTag from={flight.ARV.iataCode} to={flight.DRP.iataCode} arrive={flight.ARV.at} leave={flight.DRP.at} cost={flight.Cost} />
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    {hotels.map(hotel=>(
                        <HotelTag city={hotel.city} cost={hotel.cost} name={hotel.name} rating={hotel.rating}/>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    {events.map(event =>(
                        <EventTag name={event.name} location={event.location} type={event.type} date={event.date} cost={event.cost}/>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Messager planID={planID} username={username}/>
                </Col>
            </Row>
        </Container>
        
    );
}

export default TravelPlanner;