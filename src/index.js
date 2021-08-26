import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import Store from './store';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// wrap decorators around React App to provide 
// 1. redux state throughout app
// 2. routing across app
ReactDOM.render(
  <Provider store={Store}>
    <Router> 
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
