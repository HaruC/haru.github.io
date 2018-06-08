import {
	LOAD_SCHEDULE_REQUEST,
	LOAD_SCHEDULE_SUCCESS,
	LOAD_SCHEDULE_ERROR,
	LOAD_UUID_REQUEST,
	LOAD_UUID_SUCCESS,
	LOAD_UUID_ERROR,
	LOAD_GROUP_REQUEST,
	LOAD_TEACHER_REQUEST,
	LOAD_TEACHER_SUCCESS,
	LOAD_TEACHER_ERROR,
	LOAD_GROUP_SUCCESS,
	LOAD_GROUP_ERROR,
	CREATE_UUID_ERROR,
	CREATE_UUID_SUCCESS,
} from '../actions/index'

const initialState = {
	uuid: null,
	created: null,
	status: null,
	data: null,
	error: null,
	loading: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SCHEDULE_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})
		case LOAD_SCHEDULE_SUCCESS:
			return Object.assign({}, state, {
				data: action.payload,
				loading: false
			})
		case LOAD_SCHEDULE_ERROR:
			return Object.assign({}, state, {
				error: action.payload,
				loading: false
			})
		case LOAD_TEACHER_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})
		case LOAD_TEACHER_SUCCESS:
			return Object.assign({}, state, {
				data: action.payload,
				loading: false
			})
		case LOAD_TEACHER_ERROR:
			return Object.assign({}, state, {
				error: action.payload,
				loading: false
			})
		case LOAD_GROUP_REQUEST:
			return Object.assign({}, state, {
				loading: true
			})
		case LOAD_GROUP_SUCCESS:
			return Object.assign({}, state, {
				data: action.payload,
				loading: false
			})
		case LOAD_GROUP_ERROR:
			return Object.assign({}, state, {
				error: action.payload,
				loading: false
			})
		case LOAD_UUID_REQUEST:
			return Object.assign({}, state, {
				loading: true
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
		case CREATE_UUID_SUCCESS:
			return Object.assign({}, state, {
				created: action.payload
			})
		case CREATE_UUID_ERROR:
			return Object.assign({}, state, {
				status: action.payload
			})
		default:
			return state
	}
}
