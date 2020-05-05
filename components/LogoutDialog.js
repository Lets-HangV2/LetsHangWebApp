import React, { useState, useContext } from 'react';
import { Dialog, Button, Paragraph } from 'react-native-paper';

const LogoutDialog=props=>{

    return(
        <Dialog visible={props.isBeingDisplayed} onDismiss={props.hideDialog} style={{width: '20vw', marginLeft: '40vw'}}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
                <Paragraph>Are you sure you want to logout?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.logout}>Yes</Button>
                <Button onPress={props.hideDialog}>No</Button>
            </Dialog.Actions>
        </Dialog>
    );
}

export default LogoutDialog;