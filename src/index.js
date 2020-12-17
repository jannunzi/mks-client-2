import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import './index.css';
import './styles/mainController.scss'
import './styles/tabularize.scss'
import './styles/timbersController.scss'
import './styles/stateCounter.scss'

import './vendors/bootstrap/dist/css/bootstrap.min.css'
import './vendors/fontawesome/css/font-awesome.min.css'
import './jga.css'

import './styles/compact-single-dropdown.css'
import './styles/compact-single-input.scss'
import './styles/compact-single-checkbox.scss'
import './styles/compact-labeled-arraylist-item.scss'

import App from './components/app';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
	  <Router>
	    <App />
	  </Router>
	</Provider>,
	   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
