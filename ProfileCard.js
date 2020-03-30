import React from 'react';
import { Avatar, Card, IconButton} from 'react-native-paper';

const ProfileCard = () => (
    <Card.Title title="Username" subtitle="subtitle" left={() => <Avatar.Text size={48}/>} right={() => <Button mode="contained" />} />
);

export default ProfileCard;