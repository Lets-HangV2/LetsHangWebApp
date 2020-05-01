import React from 'react';
import { Appbar, Portal, Dialog, Paragraph, Button} from 'react-native-paper';
import CreatePost from './CreatePost';
import Container from 'react-bootstrap/Container';
import LogoutDialog from './LogoutDialog.js';

class CustomAppbar extends React.Component{

    state = {
        username: '',
        isVisible: false,
        isDialogVisible: false
    };

    render(){
        return(
            <Container>
                <Appbar>
                    <Appbar.Content title="Let's Hang" subtitle={this.state.username} onPress={this.gotoProfile} />
                    <Appbar.Action icon="magnify" onPress={this.search} />
                    <Appbar.Action icon="bell" onPress={this.gotoNotifications} />
                    <Appbar.Action icon="briefcase-plus" onPress={this.showPostScreen} />
                    <Appbar.Action icon="dots-vertical" onPress={this.showSettings} />
                </Appbar>

                    <Portal>
                        <CreatePost isBeingDisplayed={this.state.isVisible && this.showPostScreen} hideDialog={this.hidePostScreen} />
                        <Dialog visible={this.state.isDialogVisible && this.showSettings} onDismiss={this.hideSettings}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>Are you sure you want to logout?</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={this.handleLogout}>Yes</Button>
                                <Button onPress={this.hideSettings}>No</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    
            </Container>
        );
    }

    gotoNotifications(){
        console.log('Going to notifications');
    }

    search(){
        window.location.href = '/search';
    }

    gotoProfile(){
        window.location.href = '/profile';
    }

    showPostScreen =()=>{
        this.setState({isVisible : true});
    }

    hidePostScreen =()=>{
        this.setState({isVisible : false});
    }

    showSettings =()=>{
        this.setState({isDialogVisible: true});
    }

    hideSettings =()=>{
        this.setState({isDialogVisible: false});
    }

    handleLogout =()=>{
        console.log('This should log you out');
    }

}

export default CustomAppbar;