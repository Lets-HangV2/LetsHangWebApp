import React from "react";
import { StyleSheet} from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import TravelPlanner from './TravelPlanner.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PersonalMessage from './components/PersonalMessage';
import { UserProvider } from './UserContext';
import Home from './components/Home';
import Profile from './components/Profile';
import FriendsPage from './components/FriendsPage';
import Search from './components/Search';
import Register from './components/Register';
import EventTag from './components/tags/EventTag';

class App extends React.Component {

	render() {
		return (
            <PaperProvider>
				<UserProvider>
					<Router>
						<Route path="/" exact component={Home} />
						<Route path="/register" exact component={Register} />
						<Route path="/profile" component={Profile} />
						<Route path="/friends" component={FriendsPage} />
						<Route path="/search" component={Search} />
						<Route path="/travelPlanner/:username/:tripID" component={TravelPlanner} />
						<Route path="/messages" component={PersonalMessage} />
						<Route path="/test" exact component={EventTag}/>
					</Router>
				</UserProvider>
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
