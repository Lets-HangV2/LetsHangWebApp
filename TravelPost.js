import React from 'react';
import { Card, Paragraph, Button, Avatar, Chip, Title } from 'react-native-paper';

class TravelPost extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            eventId: props.key,
            tripTitle: 'Trip Title',
            tripDesc: 'Trip Description',
            picURL: 'https://picsum.photos/700'
        };
    }

    componentDidMount(){
        this.getEventInfo();
    }

    getEventInfo(){
        var data = JSON.stringify({
            "eventID": this.state.eventId,
        });

        console.log(data);
    }

    ///*{uri: 'https://picsum.photos/700' }} />*/

    render(){
        return(
            <div className="travel-post">
                <Card onPress={this.gotoTravelPlanner}>
                    <Card.Cover source={{uri: this.state.picURL}} />
                    <Card.Actions>
                        <Title></Title>
                        <Title></Title>
                    </Card.Actions>
                </Card>
            </div>
        );
    }

    gotoTravelPlanner =()=> {
        window.location.href = '/travelPlanner';
    }

    confirm =()=>{
        alert('Confirmed');
    }

    decline =()=>{
        alert('Declined');
    }
}

export default TravelPost;