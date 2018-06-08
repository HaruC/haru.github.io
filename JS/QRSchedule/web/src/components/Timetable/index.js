import React from "react"
import PropTypes from 'prop-types'
import IconButton from "material-ui/IconButton"
import KeyboardBackspace from 'material-ui-icons/KeyboardBackspace'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import {LinearProgress} from 'material-ui/Progress'
import Header from '../Header/index'
import Error from '../Error/index'
import Facility from './Facility'
import {get_week_array, now, b2i} from "../../utils/utils"


class Timetable extends React.Component {
	componentWillMount() {
		const {actions} = this.props

		actions.loadUuidRequest()
	}

	handleClick = (id) => {
		const {actions} = this.props

		// Query params
		const week = get_week_array()
		const day = week[week.length - 1]
		const cipher = b2i(id)

		actions.loadRoomsRequest(cipher, day, now)
	}

	render() {
		const {history, loading, error} = this.props

		if (loading) {
			return <LinearProgress mode="indeterminate"/>
		}

		if (error) {
			return <Error {...error} />
		}

		return (
			<div>
				<Header
					content={
						<Toolbar>
							<IconButton onClick={() => {
								history.push(`/`)
							}}>
								<KeyboardBackspace style={{color: `#FFFFFF`, marginRight: 15}}/>
							</IconButton>
							<Typography variant="title" color="inherit" style={{flex:1}}>
								Выбор аудиторий
							</Typography>
						</Toolbar>
					}
				/>
				<Facility
					handleClick={this.handleClick}
					{...this.props}
				/>
			</div>
		)
	}
}

Timetable.propTypes = {
	corpusType: PropTypes.object,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object
}

export default Timetable