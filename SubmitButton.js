import React from 'react';
import { Button } from 'react-native-paper';

const SubmitButton = () =>(
    <Button mode="contained" onPress={"changePage();"}>Submit</Button>
);

function changePage(){
    alert('Worked');
}

export default SubmitButton