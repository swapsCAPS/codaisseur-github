import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'
import { Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import Home from './containers/Home'
import GHDetail from './containers/GHDetail'
import SuccessAuth from './containers/SuccessAuth'
import NotFound from './containers/NotFound'

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/detail" component={GHDetail}/>
        <Route path="/auth/failure" component={Home}/>
        <Route path="/auth/github/callback" component={SuccessAuth}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
document.getElementById('root'))
