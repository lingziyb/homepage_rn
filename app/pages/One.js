import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity
} from 'react-native';
import Header from '../components/Header'
import AdaptionImage from '../components/AdaptionImage'
import { getOneCode } from '../actions/magazine'
import { connect } from 'react-redux';
class One extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount() {
		this.props.one.oneList.length === 0 && this.props.dispatch(getOneCode())
	}

	//跳转详情
	link(type,id){
		this.props.navigation.navigate('OneInfo',{id:id,type:type})
	}

	//渲染tag
	renderTag(tag, taglist) {
		switch (tag) {
			case '0':
				return null
				break;
			case '1':
				return (<Text style={styles.tag}>- {taglist[0] ? taglist[0].title : '阅读'} -</Text>)
				break
			case '2':
				return (<Text style={styles.tag}>- 连载 -</Text>)
				break
			case '3':
				return (<Text style={styles.tag}>- 问答 -</Text>)
				break
			case '4':
				return (<Text style={styles.tag}>- 音乐 -</Text>)
				break
			case '5':
				return (<Text style={styles.tag}>- 影视 -</Text>)
				break
			default:
				return null
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="ONE · 一个"/>
				<ScrollView style={styles.container}>
					{
						this.props.one.oneList.map((item,index) => (
							<TouchableOpacity activeOpacity={0.8} style={styles.item} key={index} onPress={() => this.link(item.category, item.item_id)}>
								{
									item.category === '0' ?
										<View>
											<AdaptionImage url={item.img_url} width={SCREEN_WIDTH}/>
											<Text style={styles.photoAuthor}>{item.title} | {item.pic_info}</Text>
											<Text style={styles.forward}>{item.forward}</Text>
										</View>
										:
										<View style={{paddingLeft:15,paddingRight:15}}>
											{this.renderTag(item.category, item.tag_list)}
											<Text style={styles.title}>{item.title}</Text>
											<Text style={styles.author}>文/{item.author.user_name}</Text>
											<AdaptionImage url={item.img_url} width={SCREEN_WIDTH - 30}/>
											<Text style={styles.forward}>{item.forward}</Text>
										</View>
								}
							</TouchableOpacity>
						))
					}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	one: state.one,
});

export default connect(mapStateToProps)(One);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item:{
		backgroundColor:'#fff',
		marginBottom:8,
		paddingBottom:20,
		paddingTop:5
	},
	photoAuthor:{
		fontSize:12,
		lineHeight:18,
		marginTop:15,
		marginBottom:6,
		textAlign:'center'
	},
	forward:{
		paddingLeft:15,
		paddingRight:15,
		fontSize:13,
		lineHeight:22,
		marginTop:8,
		color:'#666'
	},
	tag:{
		fontSize:14,
		lineHeight:20,
		textAlign:'center',
		color:'#999'
	},
	title:{
		fontSize:16,
		lineHeight:24,
		marginTop:10,
		color:'#333'
	},
	author:{
		fontSize:12,
		lineHeight:18,
		marginTop:15,
		marginBottom:6,
	}
});


