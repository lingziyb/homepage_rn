import * as types from '../actions/ActionTypes';

let initialWeatherState = {
	weatherList:[],
}

export const weather = (state = initialWeatherState,action) => {
	switch (action.type) {
		case types.SET_WEATHER_LIST:
			return {...state,...action.data}
			break
		default:
			return {...state}
	}
}