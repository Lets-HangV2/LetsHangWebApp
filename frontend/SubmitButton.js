import React from 'react';
import { Button } from 'react-native-paper';

function changePage(){
    alert('Worked');
}

const SubmitButton = () =>(
    <Button mode="contained" onPress={changePage}>Submit</Button>
);



export default SubmitButton