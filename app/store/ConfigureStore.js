
import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import RootReducer from '../reducers/rootReducer';

let middlewares = [];

middlewares.push(logger);
middlewares.push(thunk)

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const configureStore =  (initialState) => {
	return createStoreWithMiddleware(RootReducer,initialState);
}

const store = configureStore();

export default store;

// import { createStore, applyMiddleware, compose } from 'redux';
// import createLogger from 'redux-logger';
// import rootReducer from './reducers/rootReducer';
//
// const configureStore = preloadedState => {
// 	return createStore (
// 		rootReducer,
// 		preloadedState,
// 		compose (
// 			applyMiddleware(createLogger)
// 		)
// 	);
// }
//
// const store = configureStore();
//
// export default store;