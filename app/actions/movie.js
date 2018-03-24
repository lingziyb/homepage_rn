import * as types from './ActionTypes';
import utils from '../utils'

export const setTimeList = (data) => ({
	type: types.SET_TIME_LIST,
	data
})

export const getTimeSellList = () => {
	return (dispatch) => {
		utils.axios.get('time/sell')
			.then(res => {
				dispatch(setTimeList({sellList:res.data.data.movies}))
			})
	}
}
export const getTimeHotList = () => {
	return (dispatch) => {
		utils.axios.get('time/hot')
			.then(res => {
				dispatch(setTimeList({hotList:res.data.data.ms}))
			})
	}
}
export const getTimeSoonList = () => {
	return (dispatch) => {
		utils.axios.get('time/soon')
			.then(res => {
				dispatch(setTimeList({soonList:res.data.data.attention}))
			})
	}
}

export const setDoubanList = (data) => ({
	type: types.SET_DOUBAN_LIST,
	data
})

export const setDoubanPage = (data) => ({
	type:types.SET_DOUBAN_PAGE,
	data
})

export const setDoubanTotal = (data) => ({
	type:types.SET_DOUBAN_TOTAL,
	data
})

export const setDoubanScroll = (data) => ({
	type:types.SET_DOUBAN_SCROLL,
	data
})

export const setDoubanRefreshing = (data) => ({
	type:types.SET_DOUBAN_REFRESHING,
	data
})

export const getDoubanList = () => {
	return (dispatch,getState) => {
		const { douban } = getState();
		utils.axios.get('douban/list',{
			params:{
				city:'杭州',
				page:douban.doubanPage,
				limit:douban.doubanLimit
			}
		}).then(res => {
			dispatch(setDoubanList({doubanList:res.data.data.subjects}))
			dispatch(setDoubanTotal({doubanTotal:res.data.data.total}))
			dispatch(setDoubanScroll({doubanCanScroll:(douban.doubanPage >= Math.ceil(res.data.data.total / douban.doubanLimit)) ? false : true}))
			setTimeout(() => {
				dispatch(setDoubanRefreshing({doubanRefreshing:false}))
			},1000)

		})
	}
}