import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image
} from 'react-native';
import Header from '../components/Header'
import AdaptionImage from '../components/AdaptionImage'
import { Toast } from 'antd-mobile'
import utils from '../utils'

export default class TimeInfo extends Component {

	constructor(props){
		super(props)
		this.state = {
			info:{},
			load:false
		}
	}

	componentDidMount() {
		this.getInfo()
	}

	//获取详情
	getInfo(){
		Toast.loading('加载中...')
		utils.axios.get('time/info',{
			params:{
				id:this.props.navigation.state.params.id
			}
		}).then(res => {
			Toast.hide()
			this.setState({info:res.data.data.info.basic,load:true})
		})
	}

	render() {
		let info = this.state.info
		return (
			<View style={styles.container}>
				<Header title="电影详情" back={true} navigation={this.props.navigation}></Header>
				{
					this.state.load ?
						<ScrollView contentContainerStyle={styles.contentContainerStyle}>
							<Text style={styles.title}>{info.name} {info.nameEn}</Text>
							<Text style={styles.subtitle}>剧情简介：</Text>
							<Text style={styles.story}>{info.story}</Text>
							<Text style={styles.subtitle}>导演：</Text>
							<View style={styles.peopleBox}>
								<View style={styles.people}>
									<AdaptionImage url={info.director.img} width={SCREEN_WIDTH / 2 - 10}/>
									<Text style={styles.peopleName}>{info.director.name}</Text>
									<Text style={styles.peopleName}>{info.director.nameEn}</Text>
								</View>
							</View>
							<Text style={styles.subtitle}>演员：</Text>
							<View style={styles.peopleBox}>
								{
									info.actors.slice(0,8).map((item,index) => (
										<View style={styles.people} key={index}>
											<AdaptionImage url={item.img} width={SCREEN_WIDTH / 2 - 10}/>
											<Text style={styles.peopleName}>{item.name}</Text>
											<Text style={styles.peopleName}>{item.nameEn}</Text>
										</View>
									))
								}
							</View>
						</ScrollView>
						:
						null
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff'
	},
	contentContainerStyle:{
		padding:15
	},
	title:{
		fontSize:18,
		lineHeight:24,
		color:'#333',
		paddingLeft:15,
		paddingRight:15,
		textAlign:'center'
	},
	subtitle:{
		fontSize:14,
		lineHeight:30,
		color:'#999',
		marginTop:10
	},
	story:{
		fontSize:14,
		lineHeight:26,
		color:'#666',
		marginTop:10
	},
	peopleBox:{
		flexDirection:'row',
		flexWrap:'wrap'
	},
	people:{
		width:'50%',
		padding:5,
		marginTop:5
	},
	peopleName:{
		fontSize:12,
		lineHeight:24,
		color:'#333',
	}
});
