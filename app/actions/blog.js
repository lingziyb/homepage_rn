import * as types from './ActionTypes';
import utils from '../utils'

export const setArticleList = (data) => ({
	type: types.SET_ARTICLE_LIST,
	data
})

export const setArticlePage = (data) => ({
	type:types.SET_ARTICLE_PAGE,
	data
})

export const setArticleTotal = (data) => ({
	type:types.SET_ARTICLE_TOTAL,
	data
})

export const setArticleScroll = (data) => ({
	type:types.SET_ARTICLE_SCROLL,
	data
})

export const setArticleRefreshing = (data) => ({
	type:types.SET_ARTICLE_REFRESHING,
	data
})

export const getArticleList = () => {
	return (dispatch,getState) => {
		const { article } = getState();
		utils.axios.get('article/list',{
			params:{
				page:article.articlePage,
				limit:article.articleLimit
			}
		}).then(res => {
			dispatch(setArticleList({articleList:res.data.data.list}))
			dispatch(setArticleTotal({articleTotal:res.data.data.total}))
			dispatch(setArticleScroll({articleCanScroll:(article.articlePage >= Math.ceil(res.data.data.total / article.articleLimit)) ? false : true}))
			setTimeout(() => {
				dispatch(setArticleRefreshing({articleRefreshing:false}))
			},1000)

		})
	}
}

export const setAlbumList = (data) => ({
	type:types.SET_ALBUM_LIST,
	data
})

export const getAlbumList = () => {
	return (dispatch,getState) => {
		utils.axios.get('album/album')
			.then(res => {
				dispatch(setAlbumList({albumList:res.data.data}))
			})
	}
}