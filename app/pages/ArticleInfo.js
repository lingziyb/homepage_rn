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
import moment from 'moment'
import { Toast } from 'antd-mobile'
import utils from '../utils'

export default class ArticleInfo extends Component {

	constructor(props){
		super(props)
		this.state = {
			title:'',
			content:'<div></div>',
			showComment:false,
			name:'',
			commentContent:'',
			comment:[]
		}
	}

	componentDidMount() {
		this.getInfo()
		this.getComment()
	}

	//获取时间
	getTime(value){
		return moment(value).format('YYYY-MM-DD HH:mm')
	}

	//获取详情
	getInfo(){
		utils.axios.get('article/info',{
			params:{
				id:this.props.navigation.state.params.id
			}
		}).then(res => {
			let data = res.data.data
			this.setState({
				title:data.title,
				content:data.content
			})
		})
	}

	//获取评论
	getComment(){
		utils.axios.get('article/comment',{
			params:{
				id:this.props.navigation.state.params.id
			}
		}).then(res => {
			this.setState({
				comment:res.data.data
			})
		})
	}

	//发送评论
	send(){
		if(!this.state.commentContent){
			Toast.fail('请输入评论内容')
			return
		}
		utils.axios.post('article/comment',{
			name:this.state.name,
			content:this.state.commentContent,
			id:this.props.navigation.state.params.id
		}).then(res => {
			Toast.success('评论成功')
			this.setState({
				name:'',
				commentContent:'',
				showComment:false
			})
			this.getComment()
		})
	}

	//渲染评论按钮
	renderCommentBtn(){
		if(this.state.showComment){
			return(
				<TouchableOpacity activeOpacity={0.8} style={{flexDirection:'row'}} onPress={() => this.setState({showComment:!this.state.showComment})}>
					<Text style={styles.writeTextActive}>添加评论</Text>
					<Image style={styles.writeIcon} source={require('../assets/comment_active.png')}></Image>
				</TouchableOpacity>
			)
		}else{
			return(
				<TouchableOpacity activeOpacity={0.8} style={{flexDirection:'row'}} onPress={() => this.setState({showComment:!this.state.showComment})}>
					<Text style={styles.writeText}>添加评论</Text>
					<Image style={styles.writeIcon} source={require('../assets/comment.png')}></Image>
				</TouchableOpacity>
			)
		}
	}

	//渲染评论表单
	renderCommentForm(){
		if(this.state.showComment){
			return(
				<View style={styles.writeContent}>
					<View style={styles.inputBox}>
						<TextInput
							style={styles.input}
							underlineColorAndroid={'transparent'}
							onChangeText={text => this.setState({name:text})}
							value={this.state.name}
							placeholder={'昵称，非必填'}/>
					</View>
					<View style={styles.textareaBox}>
						<TextInput
							style={styles.textarea}
							underlineColorAndroid={'transparent'}
							onChangeText={text => this.setState({commentContent:text})}
							value={this.state.commentContent}
							multiline={true}
							placeholder={'评论内容'}/>
					</View>
					<TouchableOpacity activeOpacity={0.8} style={styles.commentBtn} onPress={() => this.send()}>
						<Text style={styles.commentBtnText}>提交</Text>
					</TouchableOpacity>
				</View>
			)
		}else{
			return null
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="文章详情" back navigation={this.props.navigation}/>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
					<Text style={styles.title}>{this.state.title}</Text>
					<View style={styles.content}>
						<HTML html={this.state.content} imagesMaxWidth={SCREEN_WIDTH} />
					</View>
					<View style={styles.write}>
						{this.renderCommentBtn()}
					</View>
					{this.renderCommentForm()}
					<View style={styles.commentBox}>
						<View style={styles.commentTitleBox}><Text style={styles.commentTitleText}>评论</Text></View>
						{
							this.state.comment.map((item,index) => (
								<View style={styles.commentItem} key={index}>
									<View style={styles.commentTop}>
										<Text style={styles.commentName}>{item.name}</Text>
										<Text style={styles.commentTime}>{this.getTime(item.time)}</Text>
									</View>
									<Text style={styles.commentContent}>{item.content}</Text>
								</View>
							))
						}

					</View>
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
		paddingTop:15
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
		paddingLeft:15,
		paddingRight:15,
		marginTop:20,
		minHeight:400
	},
	write:{
		flexDirection:'row',
		justifyContent:'flex-end',
		alignItems:'center',
		paddingRight:15,
		marginBottom:20
	},
	writeText:{
		fontSize:14,
		color:'#bfbfbf',
		marginRight:3,
	},
	writeTextActive:{
		color:'#1296db',
		fontSize:14,
		marginRight:3,
	},
	writeIcon:{
		width:20,
		height:20
	},
	writeContent:{
		paddingLeft:15,
		paddingRight:15,
		marginBottom:20
	},
	inputBox:{
		borderWidth:1,
		borderColor:'#ccc',
		height:30,
		justifyContent:'center',
		alignItems:'center',
		paddingLeft:10,
		marginBottom:8,
		borderRadius:6
	},
	input:{
		height:30,
		fontSize:14,
		width:'100%'
	},
	textareaBox:{
		height:150,
		borderWidth:1,
		borderColor:'#ccc',
		paddingLeft:10,
		marginBottom:8,
		paddingRight:10,
		borderRadius:6
	},
	textarea:{
		height:150,
		fontSize:14,
		width:'100%'
	},
	commentBtn:{
		height:40,
		justifyContent:'center',
		alignItems:'center',
		width:'100%',
		backgroundColor:'#26a2ff',
		borderRadius:6
	},
	commentBtnText:{
		color:'#fff',
		fontSize:18
	},
	commentBox:{
		paddingLeft:15,
		paddingRight:15,
	},
	commentTitleBox:{
		height:40,
		borderBottomWidth:1,
		borderBottomColor:'#666',
		marginBottom:20,
		justifyContent:'center'
	},
	commentTitleText:{
		fontSize:18,
		color:'#333'
	},
	commentItem:{
		paddingTop:15,
		paddingBottom:15,
		borderBottomWidth:1,
		borderBottomColor:'#999',
		marginBottom:5
	},
	commentTop:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
	commentName:{
		fontSize:14,
		lineHeight:30,
		color:'#666'
	},
	commentTime:{
		fontSize:14,
		lineHeight:30,
		color:'#999'
	},
	commentContent:{
		fontSize:12,
		lineHeight:24,
		color:'#666',
		marginTop:5
	}
});

