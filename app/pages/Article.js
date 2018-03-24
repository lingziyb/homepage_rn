import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import Header from '../components/Header'
import MenuModal from '../components/MenuModal'
import Empty from '../components/Empty'
import moment from 'moment'
import { connect } from 'react-redux';
import { getArticleList, setArticlePage, setArticleScroll, setArticleRefreshing} from '../actions/blog'


class Article extends Component {

	constructor(props){
		super(props)
		this.state = {
			showMenu : false,
		}
		this.menuList = [
			{
				title:'相册',
				url:'Album'
			}
		]
	}

	componentDidMount() {
		this.props.dispatch(setArticleScroll({articleCanScroll:true}))
		this.props.article.articleList.length === 0 && this.props.dispatch(getArticleList())
	}

	//打开菜单
	openMenu(boolen){
		this.setState({showMenu:boolen})
	}

	//获取时间
	getTime(value){
		return moment(value).format('YYYY-MM-DD HH:mm')
	}

	//跳转详情
	link(id){
		this.props.navigation.navigate('ArticleInfo',{id:id})
	}

	//上拉加载
	pullUp() {
		if (!this.props.article.articleCanScroll) {
			return
		}
		this.props.dispatch(setArticlePage({articlePage:0}))
		this.props.dispatch(getArticleList())
	}

	//设置key
	_keyExtractor = (item, index) => index.toString();

	//渲染底部
	renderfooter = () => {
		if (!this.props.article.articleCanScroll) {
			if (this.props.article.articleList.length > 0) {
				return (
					<View style={styles.noMoreBox}>
						<Text style={styles.noMoreText}>没有更多数据</Text>
					</View>
				)
			} else {
				return null
			}
		} else {
			return (<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
				<ActivityIndicator />
			</View>);
		}
	}

	//渲染空数据展示
	renderEmpty() {
		if (!this.props.article.articleCanScroll && this.props.article.articleList.length == 0) {
			return (<Empty />)
		} else {
			return null
		}
	}

	//下拉刷新
	_onRefresh() {
		this.props.dispatch(setArticlePage({articlePage:1}))
		this.props.dispatch(setArticleRefreshing({articleRefreshing:true}))
		this.props.dispatch(getArticleList())
	}

	renderItem({item}){
		return(
			<TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => this.link(item.id)}>
				<View style={styles.top}>
					<View style={styles.itemLeft}>
						<Text style={styles.itemTitle}>{item.title}</Text>
						<Text style={styles.itemTime}>{this.getTime(item.time)}</Text>
					</View>
					<View style={styles.itemRight}>
						<View style={[styles.tag,{backgroundColor:item.color}]}><Text style={styles.tagText}>{item.tag_name}</Text></View>
						{
							item.top > 0 ?
								<View style={styles.hot}><Text style={styles.tagText}>置顶</Text></View>
								:
								null
						}
					</View>
				</View>
				<Text style={styles.intro}>{item.intro}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<MenuModal show={this.state.showMenu} list={this.menuList} navigation={this.props.navigation} close={() => this.openMenu(false)}/>
				<Header title="文章" open={() => this.openMenu(true)} menu={true}/>
				<FlatList
					style={styles.container}
					data={this.props.article.articleList}
					renderItem={this.renderItem.bind(this)}
					ListEmptyComponent={() => this.renderEmpty()}
					ListFooterComponent={this.renderfooter}
					refreshing={this.props.article.articleRefreshing}
					keyExtractor={this._keyExtractor}
					onEndReachedThreshold={0.1}
					onEndReached={(info) => this.pullUp()}
					onRefresh={() => {this._onRefresh()}}
					/>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	article: state.article,
});

export default connect(mapStateToProps)(Article);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f5f5f5'
	},
	noMoreBox: {
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	noMoreText: {
		fontSize: 12,
		color: '#999'
	},
	item:{
		padding:15,
		marginTop:5,
		backgroundColor:'#fff',
	},
	top:{
		flexDirection:'row',
	},
	itemLeft:{
		flex:1
	},
	itemTitle:{
		fontSize:16,
		lineHeight:24,
		color:'#333'
	},
	itemTime:{
		fontSize:12,
		lineHeight:18,
		color:'#999',
		marginTop:5
	},
	itemRight:{
		flexDirection:'row',
		marginLeft:8
	},
	tag:{
		height:16,
		paddingLeft:5,
		paddingRight:5,
		marginRight:4,
		borderRadius:4,
		marginTop:4,
		justifyContent:'center'
	},
	hot:{
		height:16,
		paddingLeft:5,
		paddingRight:5,
		marginRight:4,
		borderRadius:4,
		marginTop:4,
		justifyContent:'center',
		backgroundColor:'#FFD700'
	},
	tagText:{
		fontSize:12,
		color:'#fff'
	},
	intro:{
		fontSize:12,
		lineHeight:18,
		marginTop:8,
		color:'#666'
	}
});

