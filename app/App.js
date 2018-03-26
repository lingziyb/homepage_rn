import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Root from './root'
import { Provider } from 'react-redux'
import store from './store/ConfigureStore'
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {

	componentDidMount() {
        SplashScreen.hide();
    }

	render() {
		return (
			<Provider store={store}>
				<Root />
			</Provider>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

