import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image
} from 'react-native';
export default (props) => {
	return (
		<View style={styles.header}>
			<View style={styles.iconLeft}>
				{
					props.back ?
						<TouchableOpacity onPress={() => props.navigation.goBack()}>
							<Image style={styles.backIcon} source={require('../assets/back.png')}/>
						</TouchableOpacity>
						:
						null
				}
			</View>
			<Text numberOfLines={1} style={styles.headerTitle}>{props.title}</Text>
			<View style={styles.iconRight}>
				{
					props.menu ?
						<TouchableOpacity style={styles.menu} onPress={() => props.open()}>
							<Image style={styles.menuIcon} source={require('../assets/menu.png')}/>
						</TouchableOpacity>
						:
						null
				}
			</View>


		</View>
	)
}

const styles = StyleSheet.create({
	header:{
		width:'100%',
		height:iOS?64:44,
		paddingTop:iOS?20:0,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#fff',
		paddingLeft:15,
		paddingRight:15,
		borderBottomWidth:1,
		borderBottomColor:'#ccc'
	},
	headerTitle:{
		fontSize:17,
		color:'#333',
		flex:1,
		textAlign:'center',
	},
	iconLeft:{
		width:80
	},
	iconRight:{
		width:80,
		alignItems:'flex-end'
	},
	menu:{
		width:30,
		height:30
	},
	menuIcon:{
		width:30,
		height:30
	},
	backIcon:{
		width:28,
		height:28
	}
})
