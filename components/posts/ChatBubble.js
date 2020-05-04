import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

const ChatBubble = props =>{
    return(
        <View style={{marginVertical: 14, flexDirection: 'row', marginLeft: 10}} >
            <View style={{maxWidth: 'scale(250)', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 15, borderRadius: 20, backgroundColor: '#1084ff'}}>
                    <Text style={{paddingTop: 5, color: 'white'}}>{props.content}</Text>
                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <View style={{left: -20}}>
                        </View>
                    </View>
            </View>
        </View>
    );
}

export default ChatBubble;