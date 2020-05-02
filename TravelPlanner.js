import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AirlineTag from './AirlineTag.js';
import HotelTag from './HotelTag.js';
import EventTag from './EventTag.js';
import { View } from 'react-native';
import { Button, Checkbox, Paragraph, Portal, Dialog, TextInput, Title} from 'react-native-paper';


class TravelPlanner extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            planID: 'f977b1bb-9c4a-4b44-9f52-f205735b37c1',
            tripName: 'TRIP NAME NOT FOUND',
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
        };
        this.renderEvents = this.renderEvents.bind(this);
        this.getPlanData = this.getPlanData.bind(this);
        this.getFlights = this.getFlights.bind(this);
    }

    componentDidMount(){
        this.getPlanData();
    }
   
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
            }
        };

    }

    renderAirport1(){
        return this.state.airportCity1.map(airport =>{
            return(
                <tr>
                    <td>
                        <Button icon="plus" mode="contained" onPress={this.addAirport.bind(this, airport.key, 'airport1')}>
                            Pick
                        </Button>
                    </td>
                    <td>{airport.name}</td>
                </tr>
            )
        });
    }

    renderAirport2(){
        return this.state.airportCity2.map(airport =>{
            return(
                <tr>
                    <td>
                        <Button icon="plus" mode="contained" onPress={this.addAirport.bind(this, airport.key, 'airport2')}>
                            Pick
                        </Button>
                    </td>
                    <td>{airport.name}</td>
                </tr>
            )
        });
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

    renderHotels(){

        return this.state.potenialHotels.map(hotel =>{
            
            return(
                <tr>
                    <td>
                        <Button icon="plus" mode="contained" onPress={this.addHotel.bind(this, hotel.key)}>
                            Select
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
                            <Dialog visible={this.state.flightVisible} onDismiss={this._hideDialog}>
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
                                                        value={this.state.flyingFrom}
                                                        onChangeText={flyingFrom => this.setState({ flyingFrom })}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row style={{marginTop: '40px'}}>
                                                <Col md={8}>
                                                    <TextInput
                                                        label='Flying To'
                                                        value={this.state.flyingTo}
                                                        onChangeText={flyingTo => this.setState({ flyingTo })}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Button mode="contained" onPress={this.findAirports}>Search</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            {this.state.airportCity1.length > 0 &&
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Airport</th>
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
                                                            <th>Airport</th>
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
                                        <Col md={12}>
                                            <Title>Find Flight</Title>
                                        </Col>
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
                                    <Row>
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
                                        <Button mode="contained" onPress={this.getFlights}>Get Flight</Button>  
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.state.pickedFlights.length > 0 &&
                                            <>
                                                <Row>
                                                    <Col md={12}>
                                                        Cheapest Flight Found
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={5}>
                                                        From: {this.state.pickedFlights[0].ARV.iataCode}, Terminal:  {this.state.pickedFlights[0].ARV.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {this.state.pickedFlights[0].ARV.at}
                                                    </Col>
                                                    <Col md={3}>
                                                        Cost: {this.state.pickedFlights[0].Cost}
                                                    </Col>
                                                    <Col md={5}>
                                                        To: {this.state.pickedFlights[0].DRP.iataCode}, Terminal:  {this.state.pickedFlights[0].DRP.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {this.state.pickedFlights[0].DRP.at}
                                                    </Col>
                                                    <Col md={3}>
                                                        Airline: {this.state.pickedFlights[0].Airline[0]}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={5}>
                                                        From: {this.state.pickedFlights[1].ARV.iataCode}, Terminal:  {this.state.pickedFlights[1].ARV.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {this.state.pickedFlights[1].ARV.at}
                                                    </Col>
                                                    <Col md={3}>
                                                        Cost: {this.state.pickedFlights[1].Cost}
                                                    </Col>
                                                    <Col md={5}>
                                                        To: {this.state.pickedFlights[1].DRP.iataCode}, Terminal:  {this.state.pickedFlights[1].DRP.terminal}
                                                    </Col>
                                                    <Col md={4}>
                                                        Date: {this.state.pickedFlights[1].DRP.at}
                                                    </Col>
                                                    <Col md={3}>
                                                        Airline: {this.state.pickedFlights[1].Airline[0]}
                                                    </Col>
                                                </Row>
                                                <Row>
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
                                    <Button mode="contained" onPress={this.findHotels.bind(this)}>
                                        Search Hotels
                                    </Button>
                                    </Col>
                                </Row>
                                <Row>
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
                            <Dialog visible={this.state.eventVisible} onDismiss={this._hideDialog}>
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
                        {   
                            this.state.flights.map(flight=>{
                                return(
                                    <AirlineTag from={flight.ARV.iataCode} to={flight.DRP.iataCode} arrive={flight.ARV.at} leave={flight.DRP.at} cost={flight.Cost}/>
                                )
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {   
                            this.state.hotels.map(hotel=>{
                                return(
                                    <HotelTag city={hotel.city} cost={hotel.cost} name={hotel.name} rating={hotel.rating}/>
                                )
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            this.state.events.map(event =>{
                                return(
                                <EventTag name={event.name} location={event.location} type={event.type} date={event.date} cost={event.cost}/>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
            
        );
    }

}

export default TravelPlanner;