import React from 'react';
import { TextInput } from 'react-native-paper';
import { accessibilityProps } from 'react-native-paper/lib/typescript/src/components/MaterialCommunityIcon';

const FormTextBox = () =>(
    <TextInput mode="outlined" value="String" label={props.dataSent} />
);

export default FormTextBox