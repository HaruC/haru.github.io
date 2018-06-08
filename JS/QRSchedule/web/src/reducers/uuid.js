import {
	LOAD_UUID_SUCCESS,
	LOAD_UUID_ERROR
} from '../actions/index'

const initialState = {
	uuid: null,
	error: null,
	loading: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_UUID_SUCCESS:
			return {...state, uuid: action.payload}
		case LOAD_UUID_ERROR:
			return {...state, error: action.payload}
		default:
			return state
	}
}
