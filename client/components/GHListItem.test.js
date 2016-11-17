import React from 'react'
import { shallow } from 'enzyme'
import wrapper from '../../test/wrapper'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import GHListItem from './GHListItem'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import InfoWrapper from '../components/InfoWrapper'

chai.use(chaiEnzyme())

const user = {
  id: 1,
  name: 'Some name',
  email: 'some@email.com',
  public_repos: 5,
  repos: [],
  events: [],
  accessToken: 'token'
}

const app = wrapper(<GHListItem user={ user } />)

describe('<GHListItem />', () => {
  it('contains a div tag', () => {
    expect(app).to.have.tagName('div')
  })
})


