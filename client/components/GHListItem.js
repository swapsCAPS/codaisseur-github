import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import InfoWrapper from '../components/InfoWrapper'
import { date } from '../helpers/properDate'

import { setUserLoading, getFullUser, getRepos, getEvents, setSelectedUser } from '../actions/get-following'

import './GHListItem.sass'

const latestRepo = (user) => {
  if(!user) return 'No user'
  if(!user.repos || user.repos.length === 0) return 'No repos'
  const last = user.repos[0]
  return date(last.created_at) + ': ' + last.name
}

const latestEvent = (user) => {
  if(!user) return 'No user'
  if(!user.events || user.events.length === 0) return 'No events'
  const last = user.events[0]
  return date(last.created_at) + ': ' + 'In '  + last.repo.name
}

const renderRepos = (user) => {
  if(!user) return []
  if(!user.repos || user.repos.length === 0) return []
  return (
    user.repos.map((r, i) => {
      return (
        <MenuItem value={i} primaryText={r.name} />
      )
    })
  )
}

const renderContent = (user) => {
  if(!user.loading) {
    return (
      <div className="info-container">
        <InfoWrapper type="Name:" info={ user.name ? user.name : 'No name given' }/>
        <InfoWrapper type="Email:" info={ user.email ? user.email : 'No email given' }/>
        <InfoWrapper type="Public repos:" info={ user.public_repos }/>
        <InfoWrapper type="Recent repo:" info={ latestRepo(user) }/>
        <InfoWrapper type="Recent push:" info={ latestEvent(user) }/>
      </div>
    )
  }
  return (
    <div className="info-container">
      <h1>Loading...</h1>
    </div>
  )
}

class GHListItem extends Component {
  state = {
    value: 1
  }

  componentDidMount() {
    const { user, getFullUser, getRepos, getEvents } = this.props
    setUserLoading(user.id, true)
    getFullUser(user)
    getRepos(user)
    getEvents(user)
    setUserLoading(user.id, false)
  }

  getAvatar(userid){
    return `https://avatars1.githubusercontent.com/u/${userid}?v=3&s=350`
  }

  setUser(){
    const { user, setSelectedUser } = this.props
    setSelectedUser(user.id)
    browserHistory.push('/detail')
  }

  render(){
    const { user } = this.props
    return (
      <Paper className="list-item" zDepth={2}>
        <div className="avatar-container">
          <a className="avatar-button" target="_blank" href={user.html_url}>
            <Avatar className="avatar" size={140} src={this.getAvatar(user.id)}/>
            <h3 className="username">{user.login}</h3>
          </a>
        </div>
        <div className="content-container" onClick={this.setUser.bind(this)}>
          { renderContent(user) }
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(null, { getFullUser, getRepos, getEvents, setSelectedUser })(GHListItem)
