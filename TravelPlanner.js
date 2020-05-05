import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomAppbar from './components/CustomAppbar';
import Messager from './components/Messager';
//import AirlineTag from './AirlineTag.js';
//import HotelTag from './HotelTag.js';
//import EventTag from './EventTag.js';
import AirlineTag from './components/tags/AirlineTag';
import HotelTag from './components/tags/HotelTag';
import EventTag from './components/tags/EventTag';
import { UserContext } from './UserContext';

import { View } from 'react-native';
import { Button, Checkbox, Paragraph, Portal, Dialog, TextInput, Title, Divider } from 'react-native-paper';


class TravelPlanner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: this.props.match.params.username,
            planID: this.props.match.params.tripID,
            tripName: '',
            cost: '',
            flights: [],
            hotels: [],
            events: [],
            potentialEvents: [],
            airportCity1: [],
            airportCity2: [],
            airport1Name: '',
            airport1IataCode: '',
            airport2Name: '',
            airport2IataCode: '',
            date1: '',
            date2: '',
            numPassengers: '',
            pickedFlights: [],
            flightVisible: false,
            hotelVisible: false,
            eventVisible: false,
            hotelText: '',
            eventText: '',
            eventDate: '',
            flyingFrom: '',
            flyingTo: '',
            potenialHotels: [],
            friends: [],
            friendList: [],
        };
        this.renderEvents = this.renderEvents.bind(this);
        this.getPlanData = this.getPlanData.bind(this);
        this.getFlights = this.getFlights.bind(this);
        this.getFriendsList = this.getFriendsList.bind(this);
    }

    componentDidMount(){
        //this.setState({planID: this.props.match.params.tripID});
        this.getPlanData();
        this.getFriendsList();
    }

    getFriendsList(){

        var that = this;
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/home';
        let xhr = new XMLHttpRequest();
        
        var data = JSON.stringify({
            'username': this.state.username
        });
        console.log(data);

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;
        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                var friends = response['user_info']['friends']

                for(var i = 0; i < friends.length; i++){
                    if(that.state.friends.includes(friends[i])){
                        friends.splice(i, 1);
                    }
                }

                that.setState({friendList: friends});
                console.log(that.state.friendList)
            }
        };
    }
   
    _showInvites = () => this.setState({inviteVisible: true});
    _hideInvites = () => this.setState({inviteVisible: false});
    _showFlightDialog = () => this.setState({ flightVisible: true });
    _hideFlightDialog = () => this.setState({ flightVisible: false });
    _showHotelDialog = () => this.setState({ hotelVisible: true });
    _hideHotelDialog = () => this.setState({ hotelVisible: false });
    _showEventDialog = () => this.setState({ eventVisible: true });
    _hideEventDialog = () => {
        this.setState({ eventVisible: false });
        this.setState({ potentialEvents: [] });
    }
    getPlanData(){
        
        var that = this;
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/getPlanDetails';
        let xhr = new XMLHttpRequest();
        console.log(this.state.planID);
        var data = JSON.stringify({
            'planID': this.state.planID
        });
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;
        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                that.setState({events: response[0]['events']});
                that.setState({hotels: response[0]['hotel']});
                that.setState({flights: response[0]['airfare']});
                that.setState({cost: response[0]['cost']});
                that.setState({friends: response[0]['friends']});
                that.setState({tripName: response[0]['planName']});
            }
        };

    }
    renderAirport1(){
        return this.state.airportCity1.map(airport =>{
            return(
                <tr>
                    <td style={{"width": "5px"}}>
                        <Button icon="plus" onPress={this.addAirport.bind(this, airport.key, 'airport1')}>
                        </Button>
                    </td>
                    <td style={{"paddingLeft": "10px"}}>{airport.name}</td>
                </tr>
            )
        });
    }

    renderAirport2(){
        return this.state.airportCity2.map(airport =>{
            return(
                <tr>
                    <td style={{"width": "20px"}}>
                        <Button icon="plus" onPress={this.addAirport.bind(this, airport.key, 'airport2')}>
                        </Button>
                    </td>
                    <td style={{"paddingLeft": "10px"}}>{airport.name}</td>
                </tr>
            )
        });
    }
    renderEvents(){
        return this.state.potentialEvents.map(event =>{
            
            return(
                <tr id={event.key}>
                    <td>
                        <Button icon="plus" onPress={this.addEvent.bind(this, event.key)}>
                        </Button>
                    </td>
                    <td>{event.name}</td>
                    <td>{(event.type).replace('_', ' ')}</td>
                    <td>{event.date.slice(0, 10)}</td>
                    <td>{event.location}</td>
                    <td>{event.cost}</td>
                </tr>
            )
        })
    }
    renderHotels(){
        return this.state.potenialHotels.map(hotel =>{
            
            return(
                <tr>
                    <td>
                        <Button icon="plus" onPress={this.addHotel.bind(this, hotel.key)}>
                        </Button>
                    </td>
                    <td>{hotel.name}</td>
                    <td>{hotel.rating}</td>
                    <td>{hotel.city}</td>
                    <td>{hotel.cost}</td>
                </tr>
            )
        })
    }
    addHotel = (key) => {
        var that = this;
        var data = JSON.stringify({
            'planID': this.state.planID,
            'hotel': this.state.potenialHotels[key]
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
        var duplicateList = [...this.state.potenialHotels];
        duplicateList.splice(key, 1);
        that.setState({potenialHotels: duplicateList});
        that.getPlanData();
    }
    addAirport = (key, airport) =>{
        if(airport == 'airport1'){
            var airport = this.state.airportCity1[key];
            this.setState({airport1Name: airport.name});
            this.setState({airport1IataCode: airport.iataCode});
        }else{
            var airport = this.state.airportCity2[key];
            this.setState({airport2Name: airport.name});
            this.setState({airport2IataCode: airport.iataCode});
        }
    }
    _findEvents = () =>{
        var that = this;
        var data = JSON.stringify({
            'address': this.state.eventText,
            'date': this.state.eventDate
        });
        console.log('TRYING TO GET EVENTS');
        console.log(this.state.potentialEvents);
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
                that.setState({
                    potentialEvents: response['events']
                });
                console.log(that.state.potentialEvents)
            }
        };
    };
    addEvent(key){
        var that = this;
        var plan_id = this.state.planID;
        var event = this.state.potentialEvents[key];
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
        var duplicateList = [...this.state.potentialEvents];
        duplicateList.splice(key, 1);
        that.setState({potentialEvents: duplicateList});
        that.getPlanData();
    }
    findAirports = () => {
        
        var that = this;
        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/find_airports';
        let xhr = new XMLHttpRequest();
        var data = JSON.stringify({
            'city1': this.state.flyingFrom,
            'city2': this.state.flyingTo
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
                that.setState({airportCity1: response['airports1']});
                that.setState({airportCity2: response['airports2']});
            }
        };
    }
    getFlights(){
        var that = this;
        var data = JSON.stringify({
        "origin": this.state.airport1IataCode,
        "destination": this.state.airport2IataCode,
        "leave_date": this.state.date1,
        "back_date": this.state.date2,
        "numAdults": this.state.numPassengers
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
                that.setState({pickedFlights: [response.to, response.back]});
                console.log(that.state.pickedFlights);
            }
        };
        
    }
    addFlightToPlan(){
        var that = this;
        var plan_id = this.state.planID;
        var flight = this.state.pickedFlights;
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
        that.setState({pickedFlights: []});
        that.getPlanData();
    }
    clearFlights(){
        this.setState({pickedFlights: []});
    }
    findHotels(){
        var that = this;
        var data = JSON.stringify({
            "city": this.state.hotelText
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
                that.setState({potenialHotels: response['hotels']});
                console.log(that.state.potenialHotels);
            }
        };
    }

    addFriendToPlan = () => {

    }
    
    render(){
        const { checked } = this.state;
        return(
            <Container style={{"fontFamily": "'Work Sans', sans-serif", paddingBottom: '32px'}}>
                <CustomAppbar username={this.props.username} />
                <Row>
                    <Col style={{"margin": "auto", "marginTop": "50px", "marginBottom": "20px","textAlign": "center"}} md={12}>
                        <h1 style={{"fontSize": "60px"}}>{this.state.tripName}</h1>
                        <h3 style={{"fontSize": "25px"}}>Cost: ${this.state.cost}</h3>
                        <Divider />
                    </Col>
                    <Col className="eventButton" md={2}>
                        <Button icon="plus" mode="contained" onPress={this._showFlightDialog}>
                            Add Flight
                        </Button>
                        <Portal>
                            <Dialog visible={this.state.flightVisible} onDismiss={this._hideDialog}>
                                    <Dialog.Content>
                                    <Row>
                                        <Col md={12}>
                                            <Title style={{"fontSize": "38px"}}>Find Airport</Title>
                                        </Col>
                                        <Col md={4}>
                                            <Row style={{marginTop: '10px'}}>
                                                <Col md={8}>
                                                    <TextInput
                                                        label='Flying From'
                                                        value={this.state.flyingFrom}
                                                        onChangeText={flyingFrom => this.setState({ flyingFrom })}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row style={{marginTop: '20px'}}>
                                                <Col md={8}>
                                                    <TextInput
                                                        label='Flying To'
                                                        value={this.state.flyingTo}
                                                        onChangeText={flyingTo => this.setState({ flyingTo })}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Button style={{marginTop: '10px'}} mode="contained" onPress={this.findAirports}>Search</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            {this.state.airportCity1.length > 0 &&
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Airport Origin</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderAirport1()}
                                                    </tbody>
                                                </table>
                                            }
                                        </Col>
                                        <Col md={4}>     
                                            {this.state.airportCity2.length > 0 &&
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Airport Destination</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderAirport2()}
                                                    </tbody>
                                                </table>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{"marginTop": "30px"}} md={12}>
                                            <Title style={{"fontSize": "38px"}}>Find Flight</Title>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '10px'}}>
                                        <Col md={4}>
                                            <TextInput
                                                label='Origin'
                                                value={this.state.airport1Name}
                                            />   
                                        </Col>
                                        <Col md={4}>
                                            <TextInput
                                                label='Departing'
                                                value={this.state.date1}
                                                onChangeText={date1 => this.setState({ date1 })}
                                            />   
                                        </Col>
                                        <Col md={4}>
                                            <TextInput
                                                label='# of Passengers'
                                                value={this.state.numPassengers}
                                                onChangeText={numPassengers => this.setState({ numPassengers })}
                                            />   
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '20px'}}>
                                        <Col md={4}>
                                            <TextInput
                                                label='Destination'
                                                value={this.state.airport2Name}
                                            />   
                                        </Col>
                                        <Col md={4}>
                                            <TextInput
                                                label='Returning'
                                                value={this.state.date2}
                                                onChangeText={date2 => this.setState({ date2 })}
                                            />   
                                        </Col>
                                        <Col md={4}> 
                                            <Button style={{"marginTop": "10px"}} mode="contained" onPress={this.getFlights}>Get Flight</Button>  
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.state.pickedFlights.length > 0 &&
                                            <>
                                                <Row  style={{"marginTop": "30px"}}>
                                                    <Col md={12}>
                                                        <Title style={{"fontSize": "38px"}}>Cheapest Flight</Title>
                                                    </Col>
                                                </Row>
                                                <Row style={{"fontSize": "18px", "marginTop": "12px"}}>
                                                    <Col md={5}>
                                                        From: {this.state.pickedFlights[0].ARV.iataCode}, Terminal:  {this.state.pickedFlights[0].ARV.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {(this.state.pickedFlights[0].ARV.at).slice(0, 10)} {(this.state.pickedFlights[0].ARV.at).slice(11, 16)}
                                                    </Col>
                                                    <Col md={3}>
                                                        Cost: {this.state.pickedFlights[0].Cost}
                                                    </Col>
                                                    <Col md={5}>
                                                        To: {this.state.pickedFlights[0].DRP.iataCode}, Terminal:  {this.state.pickedFlights[0].DRP.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {(this.state.pickedFlights[0].DRP.at).slice(0, 10)} {(this.state.pickedFlights[0].DRP.at).slice(11, 16)}
                                                    </Col>
                                                    <Col md={3}>
                                                        Airline: {this.state.pickedFlights[0].Airline[0]}
                                                    </Col>
                                                </Row>
                                                <Row style={{"fontSize": "18px", "marginTop": "12px"}}>
                                                    <Col md={5}>
                                                        From: {this.state.pickedFlights[1].ARV.iataCode}, Terminal:  {this.state.pickedFlights[1].ARV.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {(this.state.pickedFlights[1].ARV.at).slice(0, 10)} {(this.state.pickedFlights[1].ARV.at).slice(11, 16)}
                                                    </Col>
                                                    <Col md={3}>
                                                        Cost: {this.state.pickedFlights[1].Cost}
                                                    </Col>
                                                    <Col md={5}>
                                                        To: {this.state.pickedFlights[1].DRP.iataCode}, Terminal:  {this.state.pickedFlights[1].DRP.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {(this.state.pickedFlights[1].ARV.at).slice(0, 10)} {(this.state.pickedFlights[1].ARV.at).slice(11, 16)}
                                                    </Col>
                                                    <Col md={3}>
                                                        Airline: {this.state.pickedFlights[1].Airline[0]}
                                                    </Col>
                                                </Row>
                                                <Row  style={{"marginTop": "10px"}}>
                                                    <Col md={3}>
                                                        <Button mode="contained" onPress={this.addFlightToPlan.bind(this)}>Add Flight</Button>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Button mode="contained" onPress={this.clearFlights.bind(this)}>Clear</Button>
                                                    </Col>
                                                </Row>
                                            </>
                                            }
                                        </Col>
                                    </Row>
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
                            <Dialog visible={this.state.hotelVisible} onDismiss={this._hideDialog}>
                                <Container>
                                <Dialog.Content>
                                <Row style={{"marginTop": "40px"}}>
                                    <Col md={12}>
                                        <Title style={{"fontSize": "38px"}}>Find Hotel</Title>
                                    </Col>
                                </Row>
                                <Row style={{"marginTop": "20px"}}>
                                    <Col md={6}>
                                        <TextInput
                                            label='Enter City'
                                            value={this.state.hotelText}
                                            onChangeText={hotelText => this.setState({ hotelText })}
                                        />
                                    </Col>
                                    <Col md={6}>
                                    <Button style={{"marginTop": "12px"}} mode="contained" onPress={this.findHotels.bind(this)}>
                                        Search Hotels
                                    </Button>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <Col>
                                        {this.state.potenialHotels.length > 0 &&
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
                                                {this.renderHotels()}
                                            </tbody>
                                        </table>
                                        }
                                    </Col>
                                </Row>
                                </Dialog.Content>
                                <Dialog.Actions>
                                <Button onPress={this._hideHotelDialog}>Done</Button>
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
                            <Dialog visible={this.state.eventVisible} onDismiss={this._hideDialog}>
                                <Container>
                                <Dialog.Content>
                                <Row style={{"marginTop": "40px"}}>
                                    <Col md={12}>
                                        <Title style={{"fontSize": "38px"}}>Find Hotel</Title>
                                    </Col>
                                </Row>
                                <Row style={{"marginTop": "20px"}}>
                                    <Col md={4}>
                                        <TextInput
                                            label='Enter City'
                                            value={this.state.eventText}
                                            onChangeText={eventText => this.setState({ eventText })}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <TextInput
                                            label='Enter Date'
                                            value={this.state.eventDate}
                                            onChangeText={eventDate => this.setState({ eventDate })}
                                        />
                                    </Col>
                                    <Col md={4}>
                                    <Button style={{"marginTop": "12px"}} icon="" mode="contained" onPress={this._findEvents}>
                                        Search Events
                                    </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {this.state.potentialEvents.length > 0 &&
                                            <table>
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
                    <Col md={12} style={{height: '24px'}}>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} style={{borderTopStyle: 'solid', borderTopWidth: '2px', borderBottomStyle: 'solid', borderBottomWidth: '2px'}}>

                        <Row style={{borderBottomStyle: 'solid', borderBottomWidth: '2px'}}>
                            <Col md={7} >
                                <h1>Friends</h1>                
                            </Col>   
                            <Col md={5}>
                                <Button style={{"marginTop": "10px"}} icon="" mode="contained" onPress={this._showInvites}>
                                    Invite
                                </Button>
                                <Portal>
                                    <Dialog visible={this.state.inviteVisible} onDismiss={this._hideInvites}>
                                        <Dialog.Content>
                                        <Row>
                                            <Col md={12}>
                                                <h1>Invite Friends</h1>
                                            </Col>
                                            {
                                                this.state.friendList.map(function(friend){
                                                    return(
                                                        <>
                                                        <Col md={4}>
                                                        </Col>
                                                        <Col md={2}>
                                                            <Button style={{"fontSize": "40px;", "width": "30px"}} icon="plus"> 
                                                            </Button>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Title>{friend}</Title>
                                                        </Col>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Row>
                                        </Dialog.Content>
                                        <Dialog.Actions>
                                        <Button onPress={this._hideInvites}>Done</Button>
                                        </Dialog.Actions>
                                    </Dialog>
                                </Portal>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
        
                                {
                                    this.state.friends.map(function(friend, index){
                                        return <h5 style={{"marginLeft": "35px"}} key={ index }> • {(friend).toUpperCase()}</h5>;
                                    })
                                }
                            </Col>
                        </Row>


                    </Col>
                    <Col md={9} style={{borderLeftStyle: 'solid', borderLeftWidth: '2px', borderTopStyle: 'solid', borderTopWidth: '2px', borderBottomStyle: 'solid', borderBottomWidth: '2px'}}>
                        <Row style={{borderBottomStyle: 'solid', borderBottomWidth: '2px'}}>
                            <Col md={12}>
                                <h1 style={{"textAlign":"center"}}>Itinerary</h1>
                            </Col>
                        </Row>
                        <Row style={{"maxHeight": "650px", "height": "650px", "overflowY": "scroll"}}>
                            <Col md={12}>
                                {   
                                    this.state.flights.map(flight=>{
                                        return(
                                            <AirlineTag from={flight.ARV.iataCode} to={flight.DRP.iataCode} arrive={flight.ARV.at} leave={flight.DRP.at} cost={flight.Cost}/>
                                        )
                                    })
                                }
                            </Col>
                            <Col md={12}>
                                {   
                                    this.state.hotels.map(hotel=>{
                                        return(
                                            <HotelTag city={hotel.city} cost={hotel.cost} name={hotel.name} rating={hotel.rating}/>
                                        )
                                    })
                                }
                            </Col>
                            <Col md={12}>
                                {
                                    this.state.events.map(event =>{
                                        return(
                                        <EventTag name={event.name} location={event.location} type={event.type} date={event.date} cost={event.cost}/>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Messager planID={this.state.planID}/>
                    </Col>
                </Row>
            </Container>

        );
    }
}
export default TravelPlanner;