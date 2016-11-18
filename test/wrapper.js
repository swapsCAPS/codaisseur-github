import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import store from '../client/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CodaisseurGithub from '../client/styles/base-theme'

export default (node, nodeContext = {}) => {
  let context = Object.assign({}, nodeContext)

  return mount(
    <Provider store={store}>
      <MuiThemeProvider>
        {node}
      </MuiThemeProvider>
    </Provider>, { context }
  )
}
