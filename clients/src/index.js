import * as serviceWorker from './serviceWorker';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import appReducers from './reducers/app.reducers';

const store = createStore(appReducers, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister();
