import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import store from '../src/store'

export default (node, nodeContext = {}) => {
  let context = Object.assign({}, nodeContext)

  return mount(
    <Provider store={store}>
      {node}
    </Provider>, { context }
  )
}
