import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Header from '../components/Header'
import MenuModal from '../components/MenuModal'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TimeList from './TimeList'

export default class Time extends Component {

	constructor(props){
		super(props)
		this.state = {
			showMenu : false,
		}
		this.menuList = [
			{
				title:'豆瓣电影',
				url:'Douban'
			}
		]
	}

	componentDidMount() {
		console.log(this.props)
	}

	//打开菜单
	openMenu(boolen){
		this.setState({showMenu:boolen})
	}

	render() {
		return (
			<View style={styles.container}>
				<MenuModal show={this.state.showMenu} list={this.menuList} navigation={this.props.navigation} close={() => this.openMenu(false)}/>
				<Header title="Time时光" open={() => this.openMenu(true)} menu={true}/>
				<ScrollableTabView
					locked={true}
					tabBarUnderlineStyle={{backgroundColor:'#26a2ff'}}
					tabBarActiveTextColor='#26a2ff'>
					<TimeList  tabLabel="正在售票" type="sell" navigation={this.props.navigation}/>
					<TimeList  tabLabel="正在热映" type="hot" navigation={this.props.navigation}/>
					<TimeList  tabLabel="即将上映" type="soon" navigation={this.props.navigation}/>
				</ScrollableTabView>
			</View>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff'
	},
});



