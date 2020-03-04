import React from 'react';
import { TextInput } from 'react-native-paper';

const FormTextBox = ({value}, {label}) =>(
    <TextInput mode="outlined" value={value} label={label} />
);

export default FormTextBox