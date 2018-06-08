import {call, put, takeLatest} from 'redux-saga/effects'
import {
	loadFacilityData,
	loadScheduleData,
	loadTeacherData,
	createUuidData,
	loadGroupData,
	loadRoomsData,
	loadUuidData,
	loadPdf
} from '../utils/queries'
import {
	LOAD_SCHEDULE_REQUEST,
	LOAD_UUID_REQUEST,
	LOAD_ROOMS_REQUEST,
	LOAD_FACILITY_REQUEST,
	LOAD_SCHEDULE_WAITING,
	LOAD_UUID_WAITING,
	LOAD_ROOMS_WAITING,
	LOAD_SCHEDULE_SUCCESS,
	LOAD_FACILITY_WAITING,
	LOAD_UUID_SUCCESS,
	LOAD_ROOMS_SUCCESS,
	LOAD_FACILITY_SUCCESS,
	LOAD_SCHEDULE_ERROR,
	LOAD_UUID_ERROR,
	LOAD_ROOMS_ERROR,
	LOAD_FACILITY_ERROR,
	CREATE_UUID_ERROR,
	CREATE_UUID_REQUEST,
	CREATE_UUID_SUCCESS,
	CREATE_UUID_WAITING,
	LOAD_CODE_ERROR,
	LOAD_CODE_REQUEST,
	LOAD_CODE_SUCCESS,
	LOAD_CODE_WAITING,
	LOAD_GROUP_ERROR,
	LOAD_GROUP_REQUEST,
	LOAD_GROUP_SUCCESS,
	LOAD_GROUP_WAITING,
	LOAD_TEACHER_ERROR,
	LOAD_TEACHER_REQUEST,
	LOAD_TEACHER_SUCCESS,
	LOAD_TEACHER_WAITING
} from '../actions/index'


function* createUuid(action) {
	yield put({type: CREATE_UUID_WAITING})

	const {data, error} = yield call(createUuidData, action.payload)

	if(data){
		yield put({type: CREATE_UUID_SUCCESS, payload: data})
	}else{
		yield put({
			type: CREATE_UUID_ERROR,
			payload: error.response || error.message
		})
	}
}

function* loadCode(action) {
	yield put({type: LOAD_CODE_WAITING})

	const {data, error} = yield call(loadPdf, action.payload)

	if(data){
		yield put({type: LOAD_CODE_SUCCESS, payload: data})
	}else{
		yield put({
			type: LOAD_CODE_ERROR,
			payload: error.response || error.message
		})
	}
}

function* fetchRooms(action) {
	yield put({type: LOAD_ROOMS_WAITING})

	const {data, error} = yield call(loadRoomsData, action.payload.id, action.payload.day, action.payload.now)

	if (data) {
		yield put({type: LOAD_ROOMS_SUCCESS, payload: data.data})
	} else {
		yield put({
			type: LOAD_ROOMS_ERROR,
			payload: error.response || error.message
		})
	}
}

function* fetchUuid(action) {
	yield put({type: LOAD_UUID_WAITING})

	const {data, error} = yield call(loadUuidData, action.payload)

	if (data) {
		yield put({type: LOAD_UUID_SUCCESS, payload: data})
	} else {
		yield put({
			type: LOAD_UUID_ERROR,
			payload: error.response || error.message
		})
	}
}

function* fetchFacility(action) {
	yield put({type: LOAD_FACILITY_WAITING})

	const {data, error} = yield call(loadFacilityData, action.payload)

	if (data) {
		yield put({type: LOAD_FACILITY_SUCCESS, payload: data.data})
	} else {
		yield put({
			type: LOAD_FACILITY_ERROR,
			payload: error.response || error.message
		})
	}
}

function* fetchTeacher(action) {
	yield put({type: LOAD_TEACHER_WAITING})

	const {data, error} = yield call(loadTeacherData, action.payload.id, action.payload.date)

	if (data) {
		yield put({type: LOAD_TEACHER_SUCCESS, payload: data.data})
	} else {
		yield put({
			type: LOAD_TEACHER_ERROR,
			payload: error.response || error.message
		})
	}
}

function* fetchGroup(action) {
	yield put({type: LOAD_GROUP_WAITING})

	const {data, error} = yield call(loadGroupData, action.payload.id, action.payload.date)

	if (data) {
		yield put({type: LOAD_GROUP_SUCCESS, payload: data.data})
	} else {
		yield put({
			type: LOAD_GROUP_ERROR,
			payload: error.response || error.message
		})
	}
}

function* fetchSchedule(action) {
	let id

	yield put({type: LOAD_UUID_WAITING})

	const list = yield call(loadUuidData)

	if (list.data) {
		const find = list.data.filter(i =>
			i.id === action.payload.id || i.uuid === action.payload.id
		)

		if (find.length) {
			id = find[0]["id"]
		} else {
			id = action.payload.id
		}

		yield put({type: LOAD_SCHEDULE_WAITING})

		const {data, error} = yield call(
			loadScheduleData,
			parseInt(Buffer.from(id, 'base64').toString('ascii').slice(6, 10), 10),
			action.payload.date
		)

		if (data) {
			yield put({type: LOAD_SCHEDULE_SUCCESS, payload: data.data})
		} else {
			yield put({
				type: LOAD_SCHEDULE_ERROR,
				payload: error.response || error.message
			})
		}
	} else {
		yield put({
			type: LOAD_UUID_ERROR,
			payload: list.error.response || list.error.message
		})
	}

}

export default function* sagaSchedule() {
	yield [
		takeLatest(LOAD_SCHEDULE_REQUEST, fetchSchedule),
		takeLatest(LOAD_FACILITY_REQUEST, fetchFacility),
		takeLatest(LOAD_TEACHER_REQUEST, fetchTeacher),
		takeLatest(CREATE_UUID_REQUEST, createUuid),
		takeLatest(LOAD_ROOMS_REQUEST, fetchRooms),
		takeLatest(LOAD_GROUP_REQUEST, fetchGroup),
		takeLatest(LOAD_UUID_REQUEST, fetchUuid),
		takeLatest(LOAD_CODE_REQUEST, loadCode)
	]
}