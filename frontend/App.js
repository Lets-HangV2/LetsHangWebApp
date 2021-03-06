import React from "react"
import { StyleSheet, Text, View, Navigator} from "react-native"
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './Home.js';
import Register from './Register.js';
import Profile from './Profile.js';

class App extends React.Component {
	render() {
		return (
            <PaperProvider>
                <Home />
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
