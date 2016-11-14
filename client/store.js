import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { configure } from 'redux-auth';

import * as reducers from './reducers';

const baseHistory = browserHistory
const routingMiddleware = routerMiddleware(baseHistory)
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))

const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f;
const enhancer = compose(
  applyMiddleware(routingMiddleware),
  applyMiddleware(ReduxThunk),
  devTools
);

const configureStore = (reducer, enhancer) => {
  const store = createStore(reducer, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  // Setup redux-auth
  store.dispatch(configure({
    apiUrl: 'http://localhost:3030',
    authProviderPaths: {
      github: '/auth/github'
    }},
    {serverSideRendering: true, cleanSession: true}
  )).then(() => {
    // your store should now have the current user. now render your
    // app to the DOM. see the demo app for a more complete example.
  });

  return store;
}

const store = configureStore(reducer, enhancer);

export const history = syncHistoryWithStore(baseHistory, store);

export default store;
