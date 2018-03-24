
import { combineReducers } from 'redux';
import { article, album} from './BlogReducer';
import { weather } from './ToolReducer'
import { time, douban } from './MovieReducer'
import { one } from './MagazineReducer'


const RootReducer = combineReducers({
	article,
	album,
	weather,
	time,
	douban,
	one
});

export default RootReducer;
