import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
	root: {
		rootGrow: 1
	},
	flex: {
		flex: 1
	}
})


class Header extends React.Component {
	render() {
		const {content, classes, style} = this.props

		return (
			<AppBar position="sticky" style={{...style}}>
				{content}
			</AppBar>
		)
	}
}


export default withStyles(styles)(Header)
