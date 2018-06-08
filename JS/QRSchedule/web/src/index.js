import React from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Provider} from 'react-redux'
import WebFont from 'webfontloader'
import Init from './components/Initial'
import client from './utils/apollo'
import configureStore from './store/index'

const store = configureStore()

WebFont.load({
	google: {
		families: ['Roboto:300', 'sans-serif']
	}
});

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<MuiThemeProvider>
				<Router>
					<Init/>
				</Router>
			</MuiThemeProvider>
		</ApolloProvider>
	</Provider>,
	document.getElementById('root')
);
