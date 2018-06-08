import React from 'react'
import {
	Link,
	Route,
	Switch,
} from 'react-router-dom'
import Header from './Header/index'
import Button from 'material-ui/Button'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import TimetableWithData from '../containers/Timetable'
import Schedule from '../containers/Schedule'

/*
 * Inline styles
 */
const styles = {
	bar: {
		background: '#0D47A1',
		header: {
			fontSize: '19px',
		},
	},
	header: {
		fontSize: '35px',
	},
	click: {
		width: '30%',
	},
	container: {
		maxWidth: '70%',
		padding: '70px 0 0 0',
		textAlign: 'center',
		margin: 'auto'
	}
};

class Init extends React.Component {
	render() {

		return (
			<Switch>
				<Route exact path={'/'} render={() => (
					<div>
						<Header
							content={
								<Toolbar>
									<Typography variant="title" color="inherit" style={{flex:1}}>
										Alpha v0.5
									</Typography>
								</Toolbar>
							}
						/>
						<div style={styles.container}>
							<h1 style={styles.header}>Расписание РГПУ им.Герцена</h1>
							<Button
								style={styles.click}
								component={Link}
								to="/timetable"
							>Перейти</Button>
						</div>
					</div>
				)}
				/>
				<Route exact path={`/timetable`} component={TimetableWithData}/>
				<Route path={`/timetable/:id`} component={Schedule}/>
			</Switch>
		)
	}
}

export default Init

