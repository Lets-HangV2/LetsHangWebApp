import React from "react"
import { StyleSheet, Text, View, Navigator} from "react-native"
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './Home.js';
import Register from './Register.js';
import Profile from './Profile.js';
import TravelPlanner from './TravelPlanner.js';
import TravelPost from "./TravelPost.js";
//import 'react-native-gesture-handler';

class App extends React.Component {

	state={
		homePage: true,
		registerPage: false
	}

	render() {
		return (
            <PaperProvider>
				<TravelPlanner />
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
