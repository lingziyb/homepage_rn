import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image
} from 'react-native';
import Header from '../components/Header'
import { connect } from 'react-redux';
import { getWeatherList } from '../actions/tool'

class Weather extends Component {

	constructor(props){
		super(props)

	}

	componentDidMount() {
		this.props.weather.weatherList.length === 0 && this.props.dispatch(getWeatherList())
	}

	//解析天气编码
	getWeatherCode(code){
		if(code < 4){
			return 'lv1'  //晴
		}else if(code < 9){
			return 'lv2' //多云
		}else if(code < 10){
			return 'lv3' //阴
		}else if(code < 19){
			return 'lv4' //雨
		}else if(code < 26){
			return 'lv5' //雪
		}else{
			return 'lv6' //其他
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="中央天气预报"/>
				<ScrollView style={styles.container}>
					{
						this.props.weather.weatherList.map((item,index) => (
							<View style={[styles.weatherItem,styles[this.getWeatherCode(item.code1)]]} key={index}>
								<Text style={styles.weatherText}>{item.date}&nbsp;&nbsp;&nbsp;&nbsp;{item.day}</Text>
								<Text style={styles.weatherText}>{item.text} {item.wind}&nbsp;&nbsp;&nbsp;&nbsp;{item.low}℃ / {item.high}℃</Text>
							</View>
						))
					}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	weather: state.weather,
});

export default connect(mapStateToProps)(Weather);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	weatherItem:{
		width:'100%',
		padding:15
	},
	lv1:{
		backgroundColor:'#0e7fdf'
	},
	lv2:{
		backgroundColor:'#50b2fb'
	},
	lv3:{
		backgroundColor:'#50b2fb'
	},
	lv4:{
		backgroundColor:'#88a9ca'
	},
	lv5:{
		backgroundColor:'#88a9ca'
	},
	lv6:{

	},
	weatherText:{
		color:'#fff',
		fontSize:12,
		lineHeight:24
	}

});




