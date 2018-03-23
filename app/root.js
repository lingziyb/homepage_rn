import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import './utils/global'
import {StackNavigator, TabNavigator} from 'react-navigation';
import One from './pages/One'
import Time from './pages/Time'
import Weather from './pages/Weather'
import Article from './pages/Article'

const Magazine = StackNavigator({
	One:{
		screen:One,
		navigationOptions:{
			header:null
		}
	}
})

const Movie = StackNavigator({
	Time:{
		screen:Time,
		navigationOptions:{
			header:null
		}
	}
})

const Tool = StackNavigator({
	Weather:{
		screen:Weather,
		navigationOptions:{
			header:null
		}
	}
})

const Blog = StackNavigator({
	Article:{
		screen:Article,
		navigationOptions:{
			header:null
		}
	}
})

export default TabNavigator({
	Magazine: {
		screen: Magazine,
		navigationOptions: {
			header:null,
			tabBarLabel: '杂志',
			tabBarIcon: ({focused}) => (
				<Image
					source={focused ? require('./assets/icon2.png') : require('./assets/icon1.png')}
					style={styles.tabIcon}
				/>
			),
		}
	},
	Movie: {
		screen: Movie,
		navigationOptions: {
			header:null,
			tabBarLabel: '电影',
			tabBarIcon: ({focused}) => (
				<Image
					source={focused ? require('./assets/icon4.png') : require('./assets/icon3.png')}
					style={styles.tabIcon}
				/>
			),
		}
	},
	Tool: {
		screen: Tool,
		navigationOptions: {
			header:null,
			tabBarLabel: '工具',
			tabBarIcon: ({focused}) => (
				<Image
					source={focused ? require('./assets/icon6.png') : require('./assets/icon5.png')}
					style={styles.tabIcon}
				/>
			),
		}
	},
	Blog: {
		screen: Blog,
		navigationOptions: {
			header:null,
			tabBarLabel: '博客',
			tabBarIcon: ({focused}) => (
				<Image
					source={focused ? require('./assets/icon8.png') : require('./assets/icon7.png')}
					style={styles.tabIcon}
				/>
			),
		}
	},
},{
	tabBarPosition: 'bottom',
	lazy: iOS?true:false,
	initialRouteName:'Blog',
	swipeEnabled:false,
	animationEnabled:false,
	tabBarOptions: {
		style: {
			height:49,
		},
		activeBackgroundColor:'#fff',
		activeTintColor:'#1296db',
		inactiveBackgroundColor:'#fff',
		inactiveTintColor:'#000',
		showLabel:true,
		showIcon: true,
		labelStyle:{
			fontSize:10,
			margin:0,
			textAlign:'center'
		},
		indicatorStyle:{
			height:0
		},
		iconStyle:{
			width:25,
			height:25,
			margin:0
		},

	}
})

const styles = StyleSheet.create({
	tabIcon:{
		width:20,
		height:20,
	}
});

