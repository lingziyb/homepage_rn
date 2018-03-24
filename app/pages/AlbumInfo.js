import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,

} from 'react-native';
import Header from '../components/Header'
import AdaptionImage from '../components/AdaptionImage'
import utils from '../utils'

export default class AlbumInfo extends Component {

	constructor(props){
		super(props)
		this.state = {
			list:[]
		}
	}

	componentDidMount() {
		this.getGroup()
	}

	//获取相册集
	getGroup(){
		utils.axios.get('album/group',{
			params:{
				id:this.props.navigation.state.params.id
			}
		}).then(res => {
			this.setState({list:res.data.data})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="相册" back navigation={this.props.navigation}/>
				<ScrollView style={styles.container}>
					{
						this.state.list.map((item,index) => (
							<View style={styles.imgbox} key={index}>
								<AdaptionImage url={item.url} width={SCREEN_WIDTH - 30}/>
							</View>
						))
					}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f5f5f5'
	},
	imgbox:{
		// marginBottom:10
		padding:15
	},
	image:{
		width:'100%',

	}
});
