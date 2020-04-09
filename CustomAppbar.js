import React from 'react';
import { Appbar, Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import { View } from 'react-native';

class CustomAppbar extends React.Component{

    state = {
        username: 'Default Username',
        isVisible: true
    };

    render(){
        return(
            <>
                <Appbar>
                    <Appbar.Content title="Let's Hang" subtitle={this.state.username} onPress={this.gotoProfile} />
                    <Appbar.Action icon="magnify" onPress={this.search} />
                    <Appbar.Action icon="bell" onPress={this.gotoNotifications} />
                    <Appbar.Action icon="briefcase-plus" onPress={this.showDialog} />
                    <Appbar.Action icon="dots-vertical" onPress={this.settings} />
                </Appbar>
            </>
        );
    }

    gotoNotifications(){
        alert('Going to notifications');
    }

    search(){
        alert('Going to search');
    }

    gotoCreateEvent(){
        alert('Going to create-event');
    }

    gotoProfile(){
        alert('Going to profile');
    }

    settings(){
        alert('Settings pressed');
    }

    showDialog = () => {
        alert('Displaying dialog');
        this.setState({isVisible : true});
    }

    hideDialog = () =>{
        this.setState({isVisible : false});
    }

}

export default CustomAppbar;