import React, { useState } from 'react';
import { Dialog, Button, Paragraph } from 'react-native-paper';

const LogoutDialog=props=>{

    const handleLogout=()=>{
        console.log('Logout');
    }

    return(
        <Dialog visible={props.isBeingDisplayed} onDismiss={props.hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
                <Paragraph>Are you sure you want to logout?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleLogout}>Yes</Button>
                <Button onPress={props.hideDialog}>No</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

export default LogoutDialog;