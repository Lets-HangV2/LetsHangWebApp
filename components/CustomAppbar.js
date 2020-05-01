import React, { useState } from 'react';
import { Appbar, Portal, Dialog, Paragraph, Button} from 'react-native-paper';
import CreatePost from './CreatePost';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import LogoutDialog from './LogoutDialog';

const CustomAppbar = props =>{

    let history = useHistory();

    const [isVisible, setIsVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const gotoProfile=()=>{
        const url = '/profile/'+props.username;
        history.replace(url);
    }

    const search=()=>{history.push('/search');}

    const gotoNotifications=()=>{
        console.log('Going to notifications, lol not really');
    }

    const showPostScreen=()=>{setIsVisible(true);}
    const hidePostScreen=()=>{setIsVisible(false);}

    const showSettings=()=>{setSettingsVisible(true);}
    const hideSettings=()=>{setSettingsVisible(false);}



    return(
        <Container>
            <Appbar>
                <Appbar.Content title="Let's Hang" subtitle={props.username} onPress={gotoProfile}/>
                <Appbar.Action icon="magnify" onPress={search} />
                <Appbar.Action icon="bell" onPress={gotoNotifications} />
                <Appbar.Action icon="briefcase-plus" onPress={showPostScreen} />
                <Appbar.Action icon="dots-vertical" onPress={showSettings} />
            </Appbar>

            <Portal>
                <CreatePost isBeingDisplayed={isVisible && showPostScreen} hideDialog={hidePostScreen} username={props.username} />
                <LogoutDialog isBeingDisplayed={settingsVisible && showSettings} hideDialog={hideSettings} username={props.username} />
            </Portal>
        </Container>
    );
}

export default CustomAppbar;