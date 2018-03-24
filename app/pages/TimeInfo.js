import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image
} from 'react-native';
import Header from '../components/Header'
import utils from '../utils'

export default class TimeInfo extends Component {

	constructor(props){
		super(props)
		this.state = {

		}
	}

	componentDidMount() {
		this.getInfo()
	}

	//获取详情
	getInfo(){
		utils.axios.get('time/info',{
			params:{
				id:this.props.navigation.state.params.id
			}
		}).then(res => {
			console.log(res)
			// this.setState({list:res.data.data})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="11" back={true} navigation={this.props.navigation}></Header>
				<ScrollView>

				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f5f5f5'
	},
});
