import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	Image,
	TouchableOpacity,
	FlatList
} from 'react-native';
import Header from '../components/Header'
import Empty from '../components/Empty'
import AdaptionImage from '../components/AdaptionImage'
import { connect } from 'react-redux'
import { getDoubanList, setDoubanPage, setDoubanScroll, setDoubanRefreshing} from '../actions/movie'

class Douban extends Component {

	componentDidMount() {
		this.props.dispatch(setDoubanScroll({doubanCanScroll:true}))
		this.props.douban.doubanList.length === 0 && this.props.dispatch(getDoubanList())
	}

	//跳转豆瓣详情
	link(id){
		this.props.navigation.navigate('DoubanInfo',{id:id})
	}

	//上拉加载
	pullUp() {
		if (!this.props.douban.doubanCanScroll) {
			return
		}
		this.props.dispatch(setDoubanPage({doubanPage:0}))
		this.props.dispatch(getDoubanList())
	}

	//设置key
	_keyExtractor = (item, index) => index.toString();

	//渲染底部
	renderfooter = () => {
		if (!this.props.douban.doubanCanScroll) {
			if (this.props.douban.doubanList.length > 0) {
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
		if (!this.props.douban.doubanCanScroll && this.props.douban.doubanList.length == 0) {
			return (<Empty />)
		} else {
			return null
		}
	}

	//下拉刷新
	_onRefresh() {
		this.props.dispatch(setDoubanPage({doubanPage:1}))
		this.props.dispatch(setDoubanRefreshing({doubanRefreshing:true}))
		this.props.dispatch(getDoubanList())
	}

	renderItem({item}){
		return(
			<TouchableOpacity style={styles.doubanItem} activeOpacity={0.8} onPress={() => this.link(item.id)}>
				<AdaptionImage url={item.images.medium} width={SCREEN_WIDTH - 30}/>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>
					主演：
					{
						item.casts.map((c,i) => (
							<Text style={styles.TextSpan} key={i}>{c.name}</Text>
						))
					}
				</Text>
				<Text style={styles.text}>
					导演：
					{
						item.directors.map((d,i) => (
							<Text style={styles.TextSpan} key={i}>{d.name}</Text>
						))
					}
				</Text>
				<Text style={styles.text}>豆瓣评分：{item.rating.average}</Text>
				<Text style={styles.text}>上映时间：{item.mainland_pubdate}</Text>
				<Text style={styles.text}>
					类型：
					{
						item.genres.map((g,i) => (
							<Text style={styles.TextSpan} key={i}>{g}</Text>
						))
					}
				</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="豆瓣电影" back={true} navigation={this.props.navigation}/>
				<FlatList
					style={styles.container}
					data={this.props.douban.doubanList}
					renderItem={this.renderItem.bind(this)}
					ListEmptyComponent={() => this.renderEmpty()}
					ListFooterComponent={this.renderfooter}
					refreshing={this.props.douban.doubanRefreshing}
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
	douban: state.douban,
});

export default connect(mapStateToProps)(Douban);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f5f5f5'
	},
	doubanItem:{
		backgroundColor:'#fff',
		padding:15,
		marginTop:10,
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
	},
	TextSpan:{
		marginRight:5
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
});
