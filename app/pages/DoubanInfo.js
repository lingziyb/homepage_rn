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

export default class DoubanInfo extends Component {

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
		utils.axios.get('douban/info',{
			params:{
				id:this.props.navigation.state.params.id
			}
		}).then(res => {
			this.setState({info:res.data.data,load:true})
			Toast.hide()
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
							<Text style={styles.title}>{info.title}</Text>
							<Text style={styles.infos}>
								地区：
								{
									info.countries.map((item,index) => (
										<Text style={styles.infosSpan} key={index}>{item}</Text>
									))
								}
							</Text>
							<Text style={styles.infos}>
								时长：
								{
									info.durations.map((item,index) => (
										<Text style={styles.infosSpan} key={index}>{item}</Text>
									))
								}
							</Text>
							<Text style={styles.infos}>
								类型：
								{
									info.genres.map((item,index) => (
										<Text style={styles.infosSpan} key={index}>{item}</Text>
									))
								}
							</Text>
							<Text style={styles.infos}>
								语言：
								{
									info.languages.map((item,index) => (
										<Text style={styles.infosSpan} key={index}>{item}</Text>
									))
								}
							</Text>
							<Text style={styles.infos}>豆瓣评分：{info.rating.average}</Text>
							<Text style={styles.infos}>上映时间：{info.pubdate}</Text>
							<Text style={styles.subtitle}>剧情简介：</Text>
							<Text style={styles.story}>{info.summary}</Text>
							<Text style={styles.subtitle}>导演：</Text>
							<View style={styles.peopleBox}>
								{
									info.directors.map((item,index) => (
										<View style={styles.people} key={index}>
											<AdaptionImage url={utils.getImgUrl(item.avatars.medium)} width={SCREEN_WIDTH / 2 - 10}/>
											<Text style={styles.peopleName}>{item.name}</Text>
											<Text style={styles.peopleName}>{item.name_en}</Text>
										</View>
									))
								}
							</View>
							<Text style={styles.subtitle}>演员：</Text>
							<View style={styles.peopleBox}>
								{
									info.casts.map((item,index) => (
										<View style={styles.people} key={index}>
											<AdaptionImage url={utils.getImgUrl(item.avatars.medium)} width={SCREEN_WIDTH / 2 - 10}/>
											<Text style={styles.peopleName}>{item.name}</Text>
											<Text style={styles.peopleName}>{item.name_en}</Text>
										</View>
									))
								}
							</View>
							<Text style={styles.subtitle}>剧照：</Text>
							<View style={styles.peopleBox}>
								{
									info.photos.map((item,index) => (
										<View style={styles.people} key={index}>
											<AdaptionImage url={utils.getImgUrl(item.image)} width={SCREEN_WIDTH / 2 - 10}/>
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
	infos:{
		fontSize:14,
		lineHeight:24,
		color:'#666',
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
	},
	infosSpan:{
		marginRight:6
	}
});

