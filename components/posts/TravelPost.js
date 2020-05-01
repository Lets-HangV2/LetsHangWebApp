import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-native-paper';

const TravelPost = props =>{

    let history = useHistory();

    const gotoTravelPlanner=()=>{
        history.push('/travelPlanner');
    }

    const confirm=()=>{
        console.log('confirm');
    }

    const decline=()=>{
        console.log('decline');
    }

    return(
        <>
            <Card onPress={gotoTravelPlanner}>
                <Card.Title title="TITLE" subtitle="SUBTITLE" />
                <Card.Cover source="https://picsum.photos/700" />
                <Card.Actions>
                    <Button mode="text" onPress={confirm}>Confirm</Button>
                    <Button mode="text" onPress={decline}>Decline</Button>
                </Card.Actions>
            </Card>
        </>
    );
}

export default TravelPost;