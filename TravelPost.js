import React from 'react';
import { Card, Paragraph, Button, Avatar, Chip } from 'react-native-paper';

class TravelPost extends React.Component{

    state = {
        tripTitle: 'Trip Title',
        tripDesc: 'Trip Description',
        picURL: 'https://picsum.photos/700'
    };

    ///*{uri: 'https://picsum.photos/700' }} />*/

    render(){
        return(
            <div className="travel-post">
                <Card onPress={this.gotoTravelPlanner}>
                    <Card.Title title={this.state.tripTitle} subtitle={this.state.tripDesc} />
                    <Card.Cover source={{uri: this.state.picURL}} />
                    <Card.Actions>
                        <Button mode="text" onPress={this.confirm}>Confirm</Button>
                        <Button mode="text" onPress={this.decline}>Decline</Button>
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