import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'

const ActionButton = (props) => (
	<Button
		style={props.styles}
		labelStyle={{color: props.color}}
		key={props.element.node.id}
		component={Link}
		to={
			`${props.match.url}/${
				// UUID middleware
				(props.csv.some(i => i.id === props.element.node.id))
					? props.csv.filter(i =>
					props.element.node.id === i.id
					)[0]["uuid"]
					: props.element.node.id
				}`
		}

	>
		{ props.element.node.number }
       	{
       		(props.element.node.numberAdd)
				? (props.element.node.numberAdd)
				: ('')
		}

	</Button>
)

export default ActionButton
