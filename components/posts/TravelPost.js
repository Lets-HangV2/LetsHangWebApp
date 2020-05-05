import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Text } from 'react-native-paper';

const TravelPost = props =>{

    let history = useHistory();

    const [planID, setPlanID] = useState(props.tripID);
    const [planName, setPlanName] = useState('');
    const [planCost, setPlanCost] = useState('');
    const [planStart, setPlanStart] = useState('');
    const [planEnd, setPlanEnd] = useState('');

    useEffect(() =>{
        getPlanData();
    }, []);

    const getPlanData = () =>{
        var data = JSON.stringify({
            "planID": planID
        });

        let url = 'https://ixu02acve2.execute-api.us-east-1.amazonaws.com/dev/getPlanDetails';
        let xhr = new XMLHttpRequest();

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        xhr.onreadystatechange = processRequest;
        function processRequest(e){
            if(xhr.readyState == 4 && xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                setPlanName(response[0]['planName'])
                setPlanCost(response[0]['cost'])
                setPlanStart(response[0]['startDate'])
                setPlanEnd(response[0]['endDate'])
            }
        };

    }

    const gotoTravelPlanner=()=>{
        console.log('Going to: ', props.tripID);
        let url = '/travelPlanner/'+props.tripID;
        history.push(url);
    }

    return(
        <>
            <Card onPress={gotoTravelPlanner}>
                <Card.Title title={planName} subtitle={'$' + planCost} />
                <Card.Cover source="https://picsum.photos/700" />
                <Card.Actions>
                    <Text>{planStart} </Text>
                    <Text>{planEnd}</Text>
                </Card.Actions>
            </Card>
        </>
    );
}

export default TravelPost;