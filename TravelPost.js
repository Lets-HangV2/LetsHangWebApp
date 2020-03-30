import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

class TravelPost extends React.Component{
    render(){
        return(
            <Card>
                <Card.Title title="TRIP NAME" subtitle="Extra details" />
                <Card.Cover source={{uri: 'https://picsum.photos/700' }} />
            </Card>
        );
    }
}

export default TravelPost;