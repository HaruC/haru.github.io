import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Autorenew from 'material-ui-icons/Autorenew'


/*
 * Inline styles
 */
const styles = {
	bar: {
		background: '#0D47A1',
		header: {
			fontSize: '17px',
		}
	},
	header: {
		fontSize: '25px',
	},
	container: {
		maxWidth: '70%',
		padding: '70px 0 0 0',
		textAlign: 'center',
		margin: 'auto'
	}
}

class Error extends React.Component {
	handleReload = () => {
		window.location.reload()
	}

	render() {
		const {networkError} = this.props;
		return (
			<div>
				<Header
					content={
						<Toolbar>
							<Typography variant="title" color="inherit" style={{flex:1}}>
								{(networkError) ? (networkError.statusCode) : ("Error")}
							</Typography>
							<IconButton onClick={() => this.handleReload()}>
								<Autorenew/>
							</IconButton>
						</Toolbar>
					}
				/>
				<div style={styles.container}>
					<h1 style={styles.header}>Упс, что-то пошло не так.</h1>
				</div>
			</div>
		)
	}
}

Error.propTypes = {
	networkError: PropTypes.object
}

export default Error
