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

export default class App extends Component {
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

