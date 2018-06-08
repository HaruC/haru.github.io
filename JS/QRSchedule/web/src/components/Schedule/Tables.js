import React from 'react'
import moment from 'moment'
import _ from 'lodash'

import FileDownload from 'material-ui-icons/FileUpload'

import IconButton from 'material-ui/IconButton'
import KeyboardBackspace from 'material-ui-icons/KeyboardBackspace'
import AddLocation from 'material-ui-icons/AddLocation'

import Toolbar from 'material-ui/Toolbar'
import {week, now, get_week_array, upper_lower} from '../../utils/utils'
import Header from '../Header/index'
import {Single, Week} from "./View"
import {LinearProgress} from 'material-ui/Progress'
import SwipeableViews from 'react-swipeable-views'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import {withStyles} from 'material-ui/styles'
import Error from "../Error/Error"

const styles = theme => ({
	time: {
		color: '#42A5F5',
		fontSize: '14px',
		float: 'left',
		padding: '27px 35.5px 27px 17px',
		margin: 'auto',
		[theme.breakpoints.down('xs')]: {
			padding: '40px 35.5px 45px 17px',
		},
	},
	action: {
		cursor: 'pointer'
	},
	bookmark: {
		float: 'right',
		marginTop: '-11px',
		color: 'red'
	},
	text: {
		fontSize: '12px'
	},
	head: {
		padding: '1px 17px 1px 17px',
	},
	header: {
		fontSize: '20px',
	},
	sub: {
		fontSize: '14px',
		color: '#787878'
	},
	element: {
		fontSize: '14px',
		display: 'inline-block',
		color: '#787878'
	},
	icon: {
		width: '40px',
		height: '40px',
		display: 'inline-block',
		verticalAlign: 'middle',
		padding: '1px 5px 1px 17px',
		color: '#42A5F5'
	},
	block: {
		display: 'inline-block',
		verticalAlign: 'middle',
	},
	image: {
		[theme.breakpoints.up('sm')]:{
			height: 300
		},
		[theme.breakpoints.up('lg')]:{
			height: 500
		},
		backgroundPosition: `center`,
		backgroundSize: `cover`,
		zIndex: 100,
		height: 200,
		background: `url(/static/${Math.round(Math.random())}.jpg)`
	}
});


class Tables extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			tab: new Date().getDay() - 1
    	}
	}

	handleTab = (event, tab) => {
		this.setState({tab})
	}

	handleTabIndex = (index) => {
		this.setState({ tab: index })
	}

	getCode(props) {
		const { actions } = this.props

		actions.loadCodeRequest(props.match.params.id)
	}

	createUuid(props) {
		const { actions } = this.props

		actions.createUuidRequest(props.match.params.id)
	}

	render() {
		const {classes ,match, history, variable, schedule: { data, created, loading, error }} = this.props
		const { handleTeacher, handleGroup, handleSingle } = this.props

		if(created){
			setTimeout(async () =>{
				history.push(
					history.location.pathname
						.replace(match.params.id, Object.keys(created).map(i=>created[i])[0])
				);
				await window.location.reload()
			}, 500)
		}

		if(loading){
			return <LinearProgress mode="indeterminate"/>
		}

		if(error){
			return <Error {...error}/>
		}

		const num_week = get_week_array()

		const week_type = upper_lower()

		return (
			<div>
				{
					(() => {
						switch (variable) {
							case 'teacher':
								return (
									<div>
										<Header
											content={
												<Toolbar>
													<IconButton onClick={() => {
														history.push(`/timetable`)
													}}>
														<KeyboardBackspace style={{color: `#FFFFFF`, marginRight: 15}}/>
													</IconButton>
													<Typography variant="title" color="inherit" style={{flex:1}}>
														{data.filterTeacher.edges[0].node.personnel.teachers.sFio}
														,&nbsp;
														{week_type}
														&nbsp;неделя
													</Typography>
												</Toolbar>
											}
										/>
										<AppBar position="static" color="default">
											<Tabs
												value={this.state.tab}
												onChange={this.handleTab}
												indicatorColor="primary"
												textColor="primary"
												fullWidth
												scrollable
												scrollButtons="on"
											>
												{
													num_week.map((day, index) =>
														<Tab
															key={index}
															label={
																<div>
																	<div>
																		{week[index]}
																	</div>
																	<div>
																		{moment(day).date()}
																	</div>
																</div>
															}
														/>
													)
												}
											</Tabs>
										</AppBar>
										<SwipeableViews
											index={this.state.tab}
											onChangeIndex={this.handleTabIndex}
										>
											{
												num_week.map((day, index) =>
													<Typography component="div">
														{
															_(data.filterTeacher.edges)
																.filter(data => data.node.dayType.sname === week[index])
																.sortBy('node.studyTime.timeStart')
																.map(element =>
																	(element.node.weekType.name === "" ||
																		element.node.weekType.name === week_type) ? (
																		<Week
																			key={element.node.id}
																			element={element}
																			switch={handleSingle}
																			classes={classes}
																			day={day}
																			now={now}
																		/>
																	) : (
																		''
																	)
																)
																.value()
														}
													</Typography>
												)
											}
										</SwipeableViews>
									</div>
								)
							case 'group':
								return (
									<div>
										<Header
											content={
												<Toolbar>
													<IconButton onClick={() => {
														history.push(`/timetable`)
													}}>
														<KeyboardBackspace style={{color: `#FFFFFF`, marginRight: 15}}/>
													</IconButton>
													<Typography variant="title" color="inherit" style={{flex:1}}>
														{data.filterGroup.edges[0].node.group.fullName}
														,&nbsp;
														{week_type}
														&nbsp;неделя
													</Typography>
												</Toolbar>
											}
										/>
										<AppBar position="static" color="default">
											<Tabs
												value={this.state.tab}
												onChange={this.handleTab}
												indicatorColor="primary"
												textColor="primary"
												fullWidth
												scrollable
												scrollButtons="on"
											>
												{
													num_week.map((day, index) =>
														<Tab
															key={index}
															label={
																<div>
																	<div>
																		{week[index]}
																	</div>
																	<div>
																		{moment(day).date()}
																	</div>
																</div>
															}
														/>
													)
												}
											</Tabs>
										</AppBar>
										<SwipeableViews
											index={this.state.tab}
											onChangeIndex={this.handleTabIndex}
										>
											{
												num_week.map((day, index) =>
													<Typography component="div">
														{
															_(data.filterGroup.edges)
																.filter(data => data.node.dayType.sname === week[index])
																.sortBy('node.studyTime.timeStart')
																.map(element =>
																	(element.node.weekType.name === "" ||
																		element.node.weekType.name === week_type) ? (
																		<Week
																			key={element.node.id}
																			element={element}
																			switch={handleSingle}
																			classes={classes}
																			day={day}
																			now={now}
																		/>
																	) : (
																		''
																	)
																)
																.value()
														}
													</Typography>
												)
											}
										</SwipeableViews>
									</div>
								)
							case 'single':
								return (
									<div>
										<Header
											content={
												<Toolbar>
													<IconButton onClick={() => {
														history.push(`/timetable`)
													}}>
														<KeyboardBackspace style={{color: `#FFFFFF`, marginRight: 15}}/>
													</IconButton>
													<Typography variant="title" color="inherit" style={{flex:1}}>

													</Typography>
												</Toolbar>
											}
										/>
										<div className={classes.image}></div>
										{
											data.schedule
												? _(data.schedule.edges)
														.filter(data => data.node.id === this.props.element)
														.sortBy('node.studyTime.timeStart')
														.map(element =>
															<Single
																element={element}
																handleTeacher={handleTeacher}
																handleGroup={handleGroup}
																classes={classes}
																num_week={num_week}
																week={week}
															/>
														)
														.value()
												: data.filterGroup
												  	? _(data.filterGroup.edges)
															.filter(data => data.node.id === this.props.element)
															.sortBy('node.studyTime.timeStart')
															.map(element =>
																<Single
																	element={element}
																	handleTeacher={handleTeacher}
																	handleGroup={handleGroup}
																	classes={classes}
																	num_week={num_week}
																	week={week}
																/>
															)
															.value()
													: _(data.filterTeacher.edges)
																.filter(data => data.node.id === this.props.element)
																.sortBy('node.studyTime.timeStart')
																.map(element =>
																	<Single
																		element={element}
																		handleTeacher={handleTeacher}
																		handleGroup={handleGroup}
																		classes={classes}
																		num_week={num_week}
																		week={week}
																	/>
																)
																.value()
										}
									</div>
								)
							default:
								return (
									<div>
										<Header
											content={
												<Toolbar>
													<IconButton onClick={() => {
														history.push(`/timetable`)
													}}>
														<KeyboardBackspace style={{color: `#FFFFFF`, marginRight: 15}}/>
													</IconButton>
													{
														(data.schedule.edges.length > 0)
															? (
																<Typography variant="title" color="inherit" style={{flex:1}}>
																	{data.schedule.edges[0].node.rooms.number}
																	,&nbsp;
																	{week_type}
																	&nbsp;неделя
																</Typography>
															)
															: (
																<Typography variant="title" color="inherit" style={{flex:1}}>
																	{week_type}
																	&nbsp;неделя
																</Typography>
															)
													}
													{
														(match.params.id.length > 16)
															? (
																<IconButton
																	onClick={() => this.getCode(this.props)}
																>
																	<FileDownload color={`white`} style={{ color: `#FFFFFF`}}/>
																</IconButton>
															)
															: (
																<IconButton
																	onClick={() => this.createUuid(this.props)}
																>
																	<AddLocation color={`white`} style={{ color: `#FFFFFF`}}/>
																</IconButton>
															)
													}
												</Toolbar>
											}
										/>
										<AppBar position="static" color="default">
											<Tabs
												value={this.state.tab}
												onChange={this.handleTab}
												indicatorColor="primary"
												textColor="primary"
												fullWidth
												scrollable
												scrollButtons="on"
											>
												{
													num_week.map((day, index) =>
														<Tab
															key={index}
															label={
																<div>
																	<div>
																		{week[index]}
																	</div>
																	<div>
																		{moment(day).date()}
																	</div>
																</div>
															}
														/>
													)
												}
											</Tabs>
										</AppBar>
										<SwipeableViews
											index={this.state.tab}
											onChangeIndex={this.handleTabIndex}
										>
											{
												num_week.map((day, index) =>
													<Typography component="div">
														{
															_(data.schedule.edges)
																.filter(data => data.node.dayType.sname === week[index])
																// TODO:
																// To rought, must be replaced with softer one where you save group name
																.uniqBy('node.studyTime.timeStart', 'node.personnel.teachers.fio')
																.sortBy('node.studyTime.timeStart')
																.map(element =>
																	(element.node.weekType.name === "" ||
																		element.node.weekType.name === week_type) ? (
																		<Week
																			key={element.node.id}
																			element={element}
																			switch={handleSingle}
																			classes={classes}
																			day={day}
																			now={now}
																		/>
																	) : (
																		''
																	)
																)
																.value()
														}
													</Typography>
												)
											}
										</SwipeableViews>
									</div>
								)
						}
                	})()
				}
			</div>
		)
	}
}

export default withStyles(styles)(Tables)