import * as types from '../actions/ActionTypes';

let initialArticleState = {
	articleList:[],
	articlePage:1,
	articleLimit:10,
	articleTotal:0,
	articleCanScroll:true,
	articleRefreshing:false
}
export const article = (state = initialArticleState,action) => {
	switch (action.type) {
		case types.SET_ARTICLE_LIST:
			if(state.articlePage === 1){
				return {...state,...action.data}
			}else{
				state.articleList = state.articleList.concat(action.data.articleList)
				return {...state}
			}
			break;
		case types.SET_ARTICLE_TOTAL:
			return {...state,...action.data}
			break
		case types.SET_ARTICLE_SCROLL:
			return {...state,...action.data}
			break
		case types.SET_ARTICLE_PAGE:
			if(action.data.articlePage === 1){
				return {...state,articlePage:1}
			}else{
				state.articlePage++
				return {...state}
			}
			break
		case types.SET_ARTICLE_REFRESHING:
			return {...state,...action.data}
			break
		default:
			return {...state}
	}
}

let initialAlbumState = {
	albumList:[]
}

export const album = (state = initialAlbumState,action) => {
	switch (action.type) {
		case types.SET_ALBUM_LIST:
			return {...state,...action.data}
			break
		default:
			return {...state}
	}
}