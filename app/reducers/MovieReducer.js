import * as types from '../actions/ActionTypes';

let initialTimeState = {
	sellList:[],
	hotList:[],
	soonList:[]
}

export const time = (state = initialTimeState,action) => {
	switch (action.type) {
		case types.SET_TIME_LIST:
			return {...state,...action.data}
			break
		default:
			return {...state}
	}
}

let initialDoubanState = {
	doubanList:[],
	doubanPage:1,
	doubanLimit:10,
	doubanTotal:0,
	doubanCanScroll:true,
	doubanRefreshing:false
}

export const douban = (state = initialDoubanState,action) => {
	switch (action.type) {
		case types.SET_DOUBAN_LIST:
			if(state.doubanPage === 1){
				return {...state,...action.data}
			}else{
				state.doubanList = state.doubanList.concat(action.data.doubanList)
				return {...state}
			}
			break;
		case types.SET_DOUBAN_TOTAL:
			return {...state,...action.data}
			break
		case types.SET_DOUBAN_SCROLL:
			return {...state,...action.data}
			break
		case types.SET_DOUBAN_PAGE:
			if(action.data.doubanPage === 1){
				return {...state,doubanPage:1}
			}else{
				state.doubanPage++
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