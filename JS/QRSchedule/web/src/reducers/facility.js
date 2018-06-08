import {
	LOAD_FACILITY_REQUEST,
	LOAD_FACILITY_SUCCESS,
	LOAD_FACILITY_ERROR
} from '../actions/index'

const initialState = {
	corpusType: null,
	error: null,
	loading: null
}

export default (state = initialState, {type, ...payload}) => {
	switch (type) {
		case LOAD_FACILITY_REQUEST:
			return {...state}
		case LOAD_FACILITY_SUCCESS:
			return {...state, corpusType: payload}
		case LOAD_FACILITY_ERROR:
			return {...state, error: payload}
		default:
			return state
	}
}
