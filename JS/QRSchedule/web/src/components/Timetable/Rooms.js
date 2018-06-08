import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {week, upper_lower} from '../../utils/utils'
import ActionButton from "../Button/index"

const day_type = week[moment().day() - 1];
const week_type = upper_lower();

class RoomsView extends React.Component {
	render() {
		let Substitute
		const { match, rooms: {data, uuid}, styles } = this.props

		if (data) {
			Substitute = _(data.rooms.edges)
				.sortBy("node.number")
				.map((item, index) =>
					(
						data.test.edges
							.filter(e => (
								(e.node.weekType.name === week_type ||
									e.node.weekType.name === "") &&
								e.node.dayType.sname === day_type)
							)
							.some(i => i.node.rooms.id === item.node.id)
					)
						? (
							<ActionButton
								selectRoom={this.props.selectRoom}
								key={index}
								color={`red`}
								styles={styles.taken}
								element={item}
								match={match}
								csv={uuid}
							/>
						)
						: (
							<ActionButton
								selectRoom={this.props.selectRoom}
								key={index}
								color={`black`}
								styles={styles.free}
								element={item}
								match={match}
								csv={uuid}
							/>
						)
				)
				.value()
		}

		return (
			<div>
				{(Substitute.length > 0) ? (Substitute): "Информации по данному корпусу не существует."}
			</div>
		)
	}
}

export default RoomsView