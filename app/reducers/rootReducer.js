
import { combineReducers } from 'redux';
import { article, album} from './BlogReducer';
import { weather } from './ToolReducer'
import { time } from './MovieReducer'



const RootReducer = combineReducers({
	article,
	album,
	weather,
	time
});

export default RootReducer;
