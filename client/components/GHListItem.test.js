import React from 'react'
import { shallow } from 'enzyme'
import wrapper from '../../test/wrapper'
import chai, { expect } from 'chai'
import spies from 'chai-spies'
import chaiEnzyme from 'chai-enzyme'
import GHListItem from './GHListItem'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import InfoWrapper from '../components/InfoWrapper'

chai.use(spies)
chai.use(chaiEnzyme())

const user = {
  id: 1,
  login: 'username',
  name: 'Some name',
  email: 'some@email.com',
  public_repos: 5,
  repos: [],
  events: [],
  html_url: 'https://github.com/user/username'
}

const listItem = wrapper(<GHListItem user={ user } />)

describe('<GHListItem />', () => {
  const avatarCont = listItem.find('.avatar-container')
  const contentCont = listItem.find('.content-container')
  const infoWrapper = shallow(<InfoWrapper type='bla' info='stuff' />)

  it('has the avatar-container', () => {
    expect(listItem).to.have.descendants('.avatar-container')
  })
  it('has the content-container', () => {
    expect(listItem).to.have.descendants('.content-container')
  })

  describe('Avatar Container', () => {
    it('renders the avatar', () => {
      expect(avatarCont.find('.avatar')).to.have.attr('src', `https://avatars1.githubusercontent.com/u/${user.id}?v=3&s=90`)
    })
    it('sets the href to the user', () => {
      expect(avatarCont.find('.avatar-button')).to.have.attr('href', user.html_url)
    })
  })

  describe('Content Container', () => {
    it('has the info-container', () => {
      expect(contentCont).to.have.descendants('.info-container')
    })
      describe('Info Container', () => {
      it('has some info wrappers', () => {
        expect(contentCont.find('.info-container')).to.have.descendants('.info-wrapper')
      })
    })
  })
})
