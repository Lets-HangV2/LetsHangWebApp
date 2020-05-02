import React from "react";
import { StyleSheet} from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import Register from './Register.js';
//import TravelPlanner from './TravelPlanner.js';
import CustomAppbar from './CustomAppbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Search from './Search.js';
import PersonalMessage from './PersonalMessage.js';
import { UserProvider } from './UserContext';

import Home from './components/Home';
import Profile from './components/Profile';
import FriendsPage from './components/FriendsPage';
import TravelPlanner from './components/TravelPlanner';
import Search from './components/Search';
import Messager from './components/Messager';


import UserTag from './UserTag.js';
import AirlineTag from './AirlineTag.js';

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
						<Route path="/travelPlanner" component={TravelPlanner}>
						</Route>
						<Route path="/DirectMessages">
							<CustomAppbar username="USERNAME" />
							<PersonalMessage />
						</Route>
						<Route path="/test" exact component={Messager}/>
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
