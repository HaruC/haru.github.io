import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {roomsReducer, scheduleReducer, uuidReducer} from '../reducers/index'
import sagaSchedule from '../sagas/index'

const rootReducer = combineReducers({
	rooms: roomsReducer,
	schedule: scheduleReducer,
	uuid: uuidReducer
});

const configureStore = (initialState) => {
	const sagaMiddleware = createSagaMiddleware()

	const loggerMiddleware = createLogger()
	const middleware = [loggerMiddleware, sagaMiddleware]
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(rootReducer, initialState, /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware)))
	sagaMiddleware.run(sagaSchedule)

	return store
};

export default configureStore;
