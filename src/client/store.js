import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
const thunk = require('redux-thunk').default;

const logger = createLogger({
  collapsed: true
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
