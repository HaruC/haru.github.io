export const LOAD_FACILITY_REQUEST = "LOAD_FACILITY_REQUEST"
export const LOAD_FACILITY_WAITING = "LOAD_FACILITY_WAITING"
export const LOAD_FACILITY_SUCCESS = "LOAD_FACILITY_SUCCESS"
export const LOAD_FACILITY_ERROR = "LOAD_FACILITY_ERROR"


export const loadFacilityRequest = () => {
	return {
		type: LOAD_FACILITY_REQUEST
	}
};


export const loadFacilitySuccess = (corpusType) => {
	return {
		type: LOAD_FACILITY_SUCCESS,
		payload: corpusType
	}
};


export const loadFacilityError = (error) => {
	return {
		type: LOAD_FACILITY_ERROR,
		payload: error
	}
};


export const LOAD_ROOMS_REQUEST = "LOAD_ROOMS_REQUEST"
export const LOAD_ROOMS_WAITING = "LOAD_ROOMS_WAITING"
export const LOAD_ROOMS_SUCCESS = "LOAD_ROOMS_SUCCESS"
export const LOAD_ROOMS_ERROR = "LOAD_ROOMS_ERROR"


export const loadRoomsRequest = (id, day, now) => {
	return {
		type: LOAD_ROOMS_REQUEST,
		payload: {id, day, now}
	}
};


export const loadRoomsSuccess = (rooms) => {
	return {
		type: LOAD_ROOMS_SUCCESS,
		payload: rooms
	}
};


export const loadRoomsError = (error) => {
	return {
		type: LOAD_ROOMS_ERROR,
		payload: error
	}
};


export const LOAD_UUID_REQUEST = "LOAD_UUID_REQUEST"
export const LOAD_UUID_WAITING = "LOAD_UUID_WAITING"
export const LOAD_UUID_SUCCESS = "LOAD_UUID_SUCCESS"
export const LOAD_UUID_ERROR = "LOAD_UUID_ERROR"


export const loadUuidRequest = () => {
	return {
		type: LOAD_UUID_REQUEST
	}
};


export const loadUuidSuccess = (data) => {
	return {
		type: LOAD_UUID_SUCCESS,
		payload: data
	}
};


export const loadUuidError = (error) => {
	return {
		type: LOAD_UUID_ERROR,
		payload: error
	}
};


export const LOAD_SCHEDULE_REQUEST = "LOAD_SCHEDULE_REQUEST"
export const LOAD_SCHEDULE_WAITING = "LOAD_SCHEDULE_WAITING"
export const LOAD_SCHEDULE_SUCCESS = "LOAD_SCHEDULE_SUCCESS"
export const LOAD_SCHEDULE_ERROR = "LOAD_SCHEDULE_ERROR"


export const loadScheduleRequest = (id, date) => {
	return {
		type: LOAD_SCHEDULE_REQUEST,
		payload: {
			id,
			date
		}
	}
};


export const loadScheduleSuccess = (data) => {
	return {
		type: LOAD_SCHEDULE_SUCCESS,
		payload: data
	}
};


export const loadScheduleError = (error) => {
	return {
		type: LOAD_SCHEDULE_ERROR,
		payload: error
	}
};


export const CREATE_UUID_REQUEST = "CREATE_UUID_REQUEST"
export const CREATE_UUID_WAITING = "CREATE_UUID_WAITING"
export const CREATE_UUID_SUCCESS = "CREATE_UUID_SUCCESS"
export const CREATE_UUID_ERROR = "CREATE_UUID_ERROR"


export const createUuidRequest = (id) => {
	return {
		type: CREATE_UUID_REQUEST,
		payload: id
	}
};


export const createUuidSuccess = (data) => {
	return {
		type: CREATE_UUID_SUCCESS,
		payload: data
	}
};


export const createUuidError = (error) => {
	return {
		type: CREATE_UUID_ERROR,
		payload: error
	}
};


export const LOAD_CODE_REQUEST = "LOAD_CODE_REQUEST"
export const LOAD_CODE_WAITING = "LOAD_CODE_WAITING"
export const LOAD_CODE_SUCCESS = "LOAD_CODE_SUCCESS"
export const LOAD_CODE_ERROR = "LOAD_CODE_ERROR"


export const loadCodeRequest = (id) => {
	return {
		type: LOAD_CODE_REQUEST,
		payload: id
	}
};


export const loadCodeSuccess = (data) => {
	return {
		type: LOAD_CODE_SUCCESS,
		payload: data
	}
};


export const loadCodeError = (error) => {
	return {
		type: LOAD_CODE_ERROR,
		payload: error
	}
};


export const LOAD_TEACHER_REQUEST = "LOAD_TEACHER_REQUEST"
export const LOAD_TEACHER_WAITING = "LOAD_TEACHER_WAITING"
export const LOAD_TEACHER_SUCCESS = "LOAD_TEACHER_SUCCESS"
export const LOAD_TEACHER_ERROR = "LOAD_TEACHER_ERROR"


export const loadTeacherRequest = (id, date) => {
	return {
		type: LOAD_TEACHER_REQUEST,
		payload: {
			id,
			date
		}
	}
};


export const loadTeacherSuccess = (data) => {
	return {
		type: LOAD_TEACHER_SUCCESS,
		payload: data
	}
};


export const loadTeacherError = (error) => {
	return {
		type: LOAD_TEACHER_ERROR,
		payload: error
	}
};


export const LOAD_GROUP_REQUEST = "LOAD_GROUP_REQUEST"
export const LOAD_GROUP_WAITING = "LOAD_GROUP_WAITING"
export const LOAD_GROUP_SUCCESS = "LOAD_GROUP_SUCCESS"
export const LOAD_GROUP_ERROR = "LOAD_GROUP_ERROR"


export const loadGroupRequest = (id, date) => {
	return {
		type: LOAD_GROUP_REQUEST,
		payload: {
			id,
			date
		}
	}
};


export const loadGroupSuccess = (data) => {
	return {
		type: LOAD_GROUP_SUCCESS,
		payload: data
	}
};


export const loadGroupError = (error) => {
	return {
		type: LOAD_GROUP_ERROR,
		payload: error
	}
};