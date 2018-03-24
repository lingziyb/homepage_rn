import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import AdaptionImage from '../components/AdaptionImage'
import { connect } from 'react-redux';
import { getTimeSellList, getTimeHotList, getTimeSoonList } from '../actions/movie'

class TimeList extends Component {

	constructor(props){
		super(props)
		console.log(this.props)
	}

	componentDidMount() {
		if(this.props.type === 'sell' && this.props.time[`${this.props.type}List`].length === 0){
			this.props.dispatch(getTimeSellList())
		}
		if(this.props.type === 'hot' && this.props.time[`${this.props.type}List`].length === 0){
			this.props.dispatch(getTimeHotList())
		}
		if(this.props.type === 'soon' && this.props.time[`${this.props.type}List`].length === 0){
			this.props.dispatch(getTimeSoonList())
		}
	}

	link(id){
		this.props.navigation.navigate('TimeInfo',{id:id})
	}

	renderList(){
		if(this.props.type === 'sell'){
			return (
				<View>
					{
						this.props.time[`${this.props.type}List`].map((item,index) => (
							<TouchableOpacity style={styles.timeItem} activeOpacity={0.8} key={index} onPress={() => this.link(item.movieId)}>
								<AdaptionImage url={item.img} width={SCREEN_WIDTH - 30}/>
								<Text style={styles.title}>{item.titleCn}</Text>
								<Text style={styles.intro}>{item.commonSpecial}</Text>
								<Text style={styles.text}>主演：{item.actorName1} {item.actorName2}</Text>
								<Text style={styles.text}>导演：{item.directorName}</Text>
								<Text style={styles.text}>上映时间：{item.rYear}-{item.rMonth}-{item.rDay}</Text>
								<Text style={styles.text}>类型：{item.type}</Text>
							</TouchableOpacity>
						))
					}
				</View>
			)
		}
		if(this.props.type === 'hot'){
			return (
				<View>
					{
						this.props.time[`${this.props.type}List`].map((item,index) => (
							<TouchableOpacity style={styles.timeItem} activeOpacity={0.8} key={index} onPress={() => this.link(item.id)}>
								<AdaptionImage url={item.img} width={SCREEN_WIDTH - 30}/>
								<Text style={styles.title}>{item.tCn}</Text>
								<Text style={styles.intro}>{item.commonSpecial}</Text>
								<Text style={styles.text}>主演：{item.aN1} {item.aN2}</Text>
								<Text style={styles.text}>导演：{item.dN}</Text>
								<Text style={styles.text}>上映时间：{item.rd}</Text>
								<Text style={styles.text}>类型：{item.movieType}</Text>
							</TouchableOpacity>
						))
					}
				</View>
			)
		}
		if(this.props.type === 'soon'){
			return (
				<View>
					{
						this.props.time[`${this.props.type}List`].map((item,index) => (
							<TouchableOpacity style={styles.timeItem} activeOpacity={0.8} key={index} onPress={() => this.link(item.id)}>
								<AdaptionImage url={item.image} width={SCREEN_WIDTH - 30}/>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.intro}>{item.releaseDate}</Text>
								<Text style={styles.text}>主演：{item.actor1} {item.actor2}</Text>
								<Text style={styles.text}>导演：{item.director}</Text>
								<Text style={styles.text}>上映时间：{item.rYear}-{item.rMonth}-{item.rDay}</Text>
								<Text style={styles.text}>类型：{item.type}</Text>
							</TouchableOpacity>
						))
					}
				</View>
			)
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container}>
					{this.renderList()}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	time: state.time,
});

export default connect(mapStateToProps)(TimeList);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f5f5f5'
	},
	timeItem:{
		backgroundColor:'#fff',
		padding:15,
		marginTop:10,
	},
	image:{
		width:SCREEN_WIDTH - 30,
		height: (SCREEN_WIDTH - 30) * 1.45
	},
	title:{
		marginTop:5,
		marginBottom:8,
		fontSize:16,
		lineHeight:24,
		color:'#333'
	},
	intro:{
		marginBottom:8,
		fontSize:14,
		lineHeight:24,
		color:'#444'
	},
	text:{
		fontSize:14,
		lineHeight:24,
		color:'#999'
	}
});
