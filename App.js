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
import UserTag from './UserTag.js';
import AirlineTag from './AirlineTag.js';

class App extends React.Component {

	state={
		userID: '',
		loggedIn: false,
		username: ''
	}

	getID = () =>{
		var name = document.cookie;
		name = name.substr(9,name.length);
		alert(name);
		this.state.username = this.setState({name});
	}

	getUsername=()=>{
		return this.state.username;
	}

	render() {
		return (
            <PaperProvider>
				<Router>
					<Route path="/" exact>
						<Home getUserID={this.getID} />
					</Route>
					<Route path="/register" exact>
						<Register />
					</Route>
					<Route path="/profile">
						<CustomAppbar username={this.state.username} />
						<Profile username="USERNAME" parentData={this.state.username} />
					</Route>
					<Route path="/friends">
						<CustomAppbar username="USERNAME" />
						<FriendsList authenticated={this.state.loggedIn} />
					</Route>
					<Route path="/search">
						<CustomAppbar username="USERNAME" />
						<Search authenticated={this.state.loggedIn} />
					</Route>
					<Route path="/travelPlanner">
						<CustomAppbar username="USERNAME" />
						<TravelPlanner authenticated={this.state.loggedIn} />
					</Route>
					<Route path="/DirectMessages">
						<CustomAppbar username="USERNAME" />
						<PersonalMessage authenticated={this.state.loggedIn} />
					</Route>
					<Route path="/test" exact>
						<AirlineTag />
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
