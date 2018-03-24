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
