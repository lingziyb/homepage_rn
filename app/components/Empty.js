import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';

export default () => {
	return (
		<View style={{width: '100%', alignItems: 'center', marginTop: 100}}>
			<Image style={{width: 202, height: 173}} source={require('../assets/default.png')}/>
		</View>
	)
}