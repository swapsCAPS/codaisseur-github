import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import App from './App'

chai.use(chaiEnzyme())

const app = shallow(<App />)

describe('<App />', () => {
  it('contains a div tag', () => {
    expect(app).to.have.tagName('div')
  })
})

