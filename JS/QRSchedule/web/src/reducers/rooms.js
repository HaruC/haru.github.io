import {
	LOAD_UUID_REQUEST,
	LOAD_ROOMS_REQUEST,
	LOAD_ROOMS_SUCCESS,
	LOAD_ROOMS_ERROR,
	LOAD_UUID_SUCCESS,
	LOAD_UUID_ERROR,
} from '../actions/index'

const initialState = {
	uuid: null,
	data: null,
	error: null,
	loading: true
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ROOMS_SUCCESS:
			return Object.assign({}, state, {
				data: action.payload,
				loading: false
			})
		case LOAD_ROOMS_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})
		case LOAD_ROOMS_ERROR:
			return Object.assign({}, state, {
				error: action.payload,
				loading: false
			})
		case LOAD_UUID_SUCCESS:
			return Object.assign({}, state, {
				uuid: action.payload,
				loading: false
			})
		case LOAD_UUID_ERROR:
			return Object.assign({}, state, {
				error: action.payload,
				loading: false
			})
		case LOAD_UUID_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})
		default:
			return state
	}
}