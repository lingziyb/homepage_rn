import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';
import Header from '../components/Header'
import { connect } from 'react-redux';
import { getAlbumList } from '../actions/blog'
class Album extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount() {
		this.props.album.albumList.length === 0 && this.props.dispatch(getAlbumList())
	}

	//跳转相册详情页
	link(id){
		this.props.navigation.navigate('AlbumInfo',{id:id})
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="相册" back={true} navigation={this.props.navigation}/>
				<ScrollView style={styles.container}>
					<View style={styles.album}>
						{
							this.props.album.albumList.map((item,index) => (
								<TouchableOpacity style={styles.albumItem} key={index} onPress={() => this.link(item.id)}>
									<Image style={styles.albumImage} source={{uri:item.img}}/>
									<View style={styles.albumTitleBox}>
										<Text style={styles.albumTitle}>{item.title}</Text>
									</View>
								</TouchableOpacity>
							))
						}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	album: state.album,
});

export default connect(mapStateToProps)(Album);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f5f5f5'
	},
	album:{
		flexDirection:'row',
		flexWrap:'wrap'
	},
	albumItem:{
		width:'50%',
		padding:15,
	},
	albumImage:{
		width:parseInt((SCREEN_WIDTH - 60) / 2),
		height:parseInt((SCREEN_WIDTH - 60) / 2),
	},
	albumTitleBox:{
		width:'100%',
		height:40,
		justifyContent:'center',
		alignItems:'center'
	},
	albumTitle:{
		fontSize:16,
		color:'#333'
	}
});
