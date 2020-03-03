import React from 'react';
import { Button } from 'react-native-paper';

const SubmitButton = ({label}, {func}) =>(
    <Button mode="contained" onPress={func} >{label}</Button>
);

function login(){
    alert("Did it");
}

function changePage(){
    alert('Worked');
}

export default SubmitButton