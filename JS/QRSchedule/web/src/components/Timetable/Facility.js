import React from 'react'
import RoomsView from './Rooms'
import {CircularProgress} from 'material-ui/Progress'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
/*
 * Inline styles
 */

const styles = {
	root: {
		flexGrow: 1
	},
	header: {
		textAlign: 'center',
		fontSize: '23px',
		padding: '1%',
		margin: '1%'
	},
	taken: {
		border: '1px solid red',
		margin: '1px'
	},
	free: {
		margin: '1px'
	}
};

class Facility extends React.Component {
	state = {
		active: '',
		expanded: null
	}

	setActiveComponent = (id) => {
		this.setState({
			active: id
		})
	}

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	render() {
		const { active, expanded } = this.state
		const {corpusType, handleClick, rooms} = this.props
		const { loading, error } = this.props.rooms

		return (
			<div style={styles.root}>
				{
					corpusType.edges.map((room, index) =>
						<ExpansionPanel
							key={index}
							expanded={expanded === room.node.id}
							onChange={this.handleChange(room.node.id)}
							onClick={() => {
								this.setActiveComponent(room.node.id);
								handleClick(room.node.id);
							}}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>Корпус: {room.node.number}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								{
									// TODO:
									//    Small error component
									(rooms.data)
										? (active === room.node.id)
											? (loading)
												? (<CircularProgress size={40}/>)
												: (error)
													? (<div>Произошла ошибка.</div>)
													: (<RoomsView activeRoom={room.node.id} styles={styles} {...this.props}/>)
											: ("")
										: ("")
								}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					)
				}
			</div>
		)
	}
}

export default Facility