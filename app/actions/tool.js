import * as types from './ActionTypes';
import utils from '../utils'

export const setWeatherList = (data) => ({
	type: types.SET_WEATHER_LIST,
	data
})

export const getWeatherList = () => {
	return (dispatch,getState) => {
		utils.axios.get('weather/all?city=CHZJ000000')
			.then(res => {
				dispatch(setWeatherList({weatherList:res.data.data.weather[0].future}))
			})
	}
}