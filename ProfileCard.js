import React from 'react';
import { Avatar, Card, IconButton} from 'react-native-paper';
import SubmitButton from './SubmitButton.js';

const ProfileCard = () => (
    <Card.Title title="Username" subtitle="subtitle" left={() => <Avatar.Text size={48}/>} right={() => <SubmitButton />} />
);

export default ProfileCard;