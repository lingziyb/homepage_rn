import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Header from '../components/Header'
import MenuModal from '../components/MenuModal'
// import utils from '../utils'
import { connect } from 'react-redux';
import { getArticleList } from '../actions/blog'

class Article extends Component {

	constructor(props){
		super(props)
		this.state = {
			showMenu : false
		}
		this.menuList = [
			{
				title:'文章',
				url:'Aricle'
			},
			{
				title:'相册',
				url:'Album'
			}
		]
	}

	componentDidMount() {
		this.props.article.articleList.length === 0 && this.props.dispatch(getArticleList())
	}

	openMenu(boolen){
		console.log(1)
		this.setState({showMenu:boolen})
	}
	

	render() {
		return (
			<View style={styles.container}>
				<MenuModal show={this.state.showMenu} list={this.menuList} navigation={this.props.navigation} close={() => this.openMenu(false)}/>
				<Header title="文章" open={() => this.openMenu(true)}/>

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
});

