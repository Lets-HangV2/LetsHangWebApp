import React from 'react';
import { Appbar, Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import { View } from 'react-native';
import CreatePost from './CreatePost';

class CustomAppbar extends React.Component{

    state = {
        username: 'Default Username',
        isVisible: false
    };

    render(){
        return(
            <>
                <Appbar>
                    <Appbar.Content title="Let's Hang" subtitle={this.state.username} onPress={this.gotoProfile} />
                    <Appbar.Action icon="magnify" onPress={this.search} />
                    <Appbar.Action icon="bell" onPress={this.gotoNotifications} />
                    <Appbar.Action icon="briefcase-plus" onPress={this.showPostScreen} />
                    <Appbar.Action icon="dots-vertical" onPress={this.settings} />
                </Appbar>

                <Portal>
                    <CreatePost isBeingDisplayed={this.state.isVisible && this.showPostScreen} hideDialog={this.hidePostScreen} />
                </Portal>
            </>
        );
    }

    gotoNotifications(){
        alert('Going to notifications');
    }

    search(){
        alert('Going to search');
    }

    gotoProfile(){
        alert('Going to profile');
    }

    settings(){
        alert('Settings pressed');
    }

    showPostScreen =()=>{
        this.setState({isVisible : true});
    }

    hidePostScreen =()=>{
        this.setState({isVisible : false});
    }

}

export default CustomAppbar;