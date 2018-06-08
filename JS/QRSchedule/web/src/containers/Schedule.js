import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as TimetableActions from "../actions"
import Schedule from '../components/Schedule/index'


const mapStateToProps = (state) => ({
	schedule: state.schedule
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(
		TimetableActions,
		dispatch
	)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Schedule)