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
