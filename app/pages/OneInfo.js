import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput
} from 'react-native';
import Header from '../components/Header'
import HTML from 'react-native-render-html'
import { Toast } from 'antd-mobile'
import axios from 'axios'

export default class OneInfo extends Component {

	constructor(props){
		super(props)
		this.state = {
			title:'',
			content:'<div></div>',
			author:'',
			asker:'',
			askContent:'<div></div>',
			answerer:''
		}
	}

	componentDidMount() {
		this.getInfo()
	}


	//获取详情
	getInfo(){
		let id = this.props.navigation.state.params.id
		Toast.loading('加载中...')
		switch (this.props.navigation.state.params.type){
			case '1':
				//文章获取详情
				axios.get(`http://v3.wufazhuce.com:8000/api/essay/${id}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
					.then(res => {
						let data = res.data.data
						this.setState({
							title: data.hp_title,
							author: data.author[0].user_name,
							content: data.hp_content
						})
						Toast.hide()
					})
				break
			case '2':
				//获取连载详情
				axios.get(`http://v3.wufazhuce.com:8000/api/serialcontent/${id}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
					.then(res => {
						let data = res.data.data
						this.setState({
							title: data.title,
							author: data.author.user_name,
							content: data.content
						})
						Toast.hide()
					})
				break
			case '3':
				//获取问答详情
				axios.get(`http://v3.wufazhuce.com:8000/api/question/${id}?channel=wdj&source=channel_reading&source_id=9254&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
					.then(res => {
						let data = res.data.data
						this.setState({
							title: data.question_title,
							content: data.answer_content,
							asker:data.asker.user_name,
							askContent:data.question_content,
							answerer:data.answerer.user_name
						})
						Toast.hide()
					})
				break
			case '4':
				//获取音乐详情
				axios.get(`http://v3.wufazhuce.com:8000/api/music/detail/${id}?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
					.then(res => {
						let data = res.data.data
						this.setState({
							title: data.story_title,
							author: data.author_list[0].user_name,
							content: data.story
						})
						Toast.hide()
					})
				break
			case '5':
				//获取影视详情
				axios.get(`http://v3.wufazhuce.com:8000/api/movie/${id}/story/1/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
				.then(res => {
					let data = res.data.data[0]
					this.setState({
						title: data.title,
						author: data.author_list[0].user_name,
						content: data.content
					})
					Toast.hide()
				})
				break
		}


	}



	render() {
		return (
			<View style={styles.container}>
				<Header title="文章详情" back navigation={this.props.navigation}/>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
					<Text style={styles.title}>{this.state.title}</Text>
					{
						this.props.navigation.state.params.type === '3' ?
							<View>
								<Text style={styles.author}>{this.state.asker}</Text>
								<View style={styles.askContent}>
									<HTML html={this.state.askContent} imagesMaxWidth={SCREEN_WIDTH} />
								</View>
								<Text style={styles.author}>{this.state.answerer}</Text>
								<View style={styles.content}>
									<HTML html={this.state.content} imagesMaxWidth={SCREEN_WIDTH} />
								</View>
							</View>
							:
							<View>
								<Text style={styles.author}>{this.state.author}</Text>
								<View style={styles.content}>
									<HTML html={this.state.content} imagesMaxWidth={SCREEN_WIDTH} />
								</View>
							</View>
					}


				</ScrollView>
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
		backgroundColor:'#fff',
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
	content:{
		marginTop:20,
		minHeight:400
	},
	askContent:{
		marginTop:20,
		minHeight:100
	},
	author:{
		fontSize:13,
		lineHeight:24,
		color:'#999',
		marginTop:10
	}
});

