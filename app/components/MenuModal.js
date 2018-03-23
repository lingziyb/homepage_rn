import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal
} from 'react-native';

export default class MenuModal extends Component {

	constructor(props){
		super(props)
	}

	link(url){
		this.props.close()
		this.props.navigation.navigate(url)
	}

	render() {
		return (
			<Modal
				transparent={false}
				visible={this.props.show}
				animationType="slide">
				<View style={styles.container}>
					{
						this.props.list.map((item,index) => (
							<TouchableOpacity activeOpacity={0.8} style={styles.menuBtn} key={index} onPress={() => this.link(item.url)}>
								<Text style={styles.menuText}>{item.title}</Text>
							</TouchableOpacity>
						))
					}
					<TouchableOpacity activeOpacity={0.8} style={styles.menuBtnClose} onPress={() => this.props.close()}>
						<Text style={styles.menuText}>关闭</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff',
		justifyContent:'center',
		alignItems:'center'
	},
	menuBtn:{
		width:'80%',
		height:40,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:8,
		marginBottom:20,
		backgroundColor:'#1296db'
	},
	menuText:{
		fontSize:16,
		color:'#fff'
	},
	menuBtnClose:{
		width:'80%',
		height:40,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:8,
		marginBottom:20,
		backgroundColor:'#ccc'
	}
});