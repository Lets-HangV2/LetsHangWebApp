import React from 'react';
import { Dialog, Button, Paragraph } from 'react-native-paper';

class LogoutDialog extends React.Component{

    state={
        isVisible: false
    }

    render(){
        return(
            <Dialog visible={this.props.dialogVisible} onDismiss={this.hideSettings}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Are you sure you want to logout?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={this.handleLogout}>Yes</Button>
                    <Button onPress={this.hideDialog}>No</Button>
                </Dialog.Actions>
            </Dialog>
        );
    }

    hideSettings=()=>{
        this.setState({isVisible: false});
    }
}

export default LogoutDialog;