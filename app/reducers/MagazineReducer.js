import * as types from '../actions/ActionTypes';

let initialOneState = {
	oneList:[],
	codeList:[]
}

export const one = (state = initialOneState,action) => {
	switch (action.type) {
		case types.SET_ONE_LIST:
			return {...state,...action.data}
			break
		case types.SET_ONE_CODE:
			return {...state,...action.data}
			break
		default:
			return {...state}
	}
}
