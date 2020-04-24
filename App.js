import React from "react";
import { StyleSheet} from "react-native";
import { Provider as PaperProvider, Dialog } from 'react-native-paper';
import Home from './Home.js';
import Register from './Register.js';
import Profile from './Profile.js';
import TravelPlanner from './TravelPlanner.js';
import CustomAppbar from './CustomAppbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FriendsList from './FriendsList.js';
import Search from './Search.js';
import PersonalMessage from './PersonalMessage.js';

class App extends React.Component {

	state={
		userID: ''
	}

	render() {
		return (
            <PaperProvider>
				<Router>
					<Route path="/" exact component={Home} />
					<Route path="/register" exact component={Register} />
					<Route path="/profile">
						<CustomAppbar username="USERNAME" />
						<Profile username="USERNAME" />
					</Route>
					<Route path="/friends">
						<CustomAppbar username="USERNAME" />
						<FriendsList />
					</Route>
					<Route path="/search">
						<CustomAppbar username="USERNAME" />
						<Search />
					</Route>
					<Route path="/travelPlanner">
						<CustomAppbar username="USERNAME" />
						<TravelPlanner />
					</Route>
					<Route path="/DirectMessages">
						<CustomAppbar username="USERNAME" />
						<PersonalMessage />
					</Route>
				</Router>
            </PaperProvider>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		fontWeight: "bold",
		fontSize: 30
	}
})

export default App
