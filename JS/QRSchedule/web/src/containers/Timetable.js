import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as TimetableActions from '../actions/index'
import Timetable from '../components/Timetable/index'

const corpusQuery = gql`
  query Facility{
    corpusType{
      edges{
        node{
          id
          number
        }
      }
    }
  }
`;

const TimetableWithData = graphql(corpusQuery, {
	props: ({data: {loading, error, corpusType}}) => ({
		corpusType,
		loading,
		error
	})
})(Timetable);

const mapStateToProps = state => ({
	corpusType: state.corpusType,
	rooms: state.rooms,
	uuid: state.uuid
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
)(TimetableWithData)
