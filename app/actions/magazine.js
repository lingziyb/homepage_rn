import * as types from './ActionTypes';
import axios from 'axios'

export const setOneList = (data) => ({
	type: types.SET_ONE_LIST,
	data
})

export const setOneCode = (data) => ({
	type: types.SET_ONE_CODE,
	data
})

export const getOneCode = () => {
	return (dispatch,getState) => {
		axios.get('http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android')
			.then(res => {
				dispatch(setOneCode({codeList:res.data.data}))
				dispatch(getOneList())
			})
	}
}

export const getOneList = () => {
	return (dispatch,getState) => {
		let { one } = getState()
		axios.get(`http://v3.wufazhuce.com:8000/api/onelist/${one.codeList[0]}/0?cchannel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				dispatch(setOneList({oneList:res.data.data.content_list}))
			})
	}
}
