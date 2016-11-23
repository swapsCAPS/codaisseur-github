import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import InfoWrapper from '../components/InfoWrapper'

import { getFullUser, getRepos, getEvents, setSelectedUser } from '../actions/get-following'

import './GHListItem.sass'

const latestRepo = (user) => {
  if(!user) return 'No user'
  if(!user.repos || user.repos.length === 0) return 'No repos'
  const last = user.repos[0]
  return last.created_at.substring(0, last.created_at.indexOf('T')) + ': ' + last.name
}

const latestEvent = (user) => {
  if(!user) return 'No user'
  if(!user.events || user.events.length === 0) return 'No events'
  const last = user.events[0]
  const commits = (last) => {
    if(last.type === 'PushEvent') return last.payload.commits
    return []
  }
  return last.created_at.substring(0, last.created_at.indexOf('T')) + ': ' + last.type.substring(0, last.type.indexOf('Event')) + ' in '  + last.repo.name
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

class GHListItem extends Component {
  state = {
    value: 1
  }

  componentDidMount() {
    const { user, getFullUser, getRepos, getEvents } = this.props
    getFullUser(user)
    getRepos(user)
    getEvents(user)
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
          <div className="info-container">
            <InfoWrapper type="Name:" info={ user.name ? user.name : 'No name given' }/>
            <InfoWrapper type="Email:" info={ user.email ? user.email : 'No email given' }/>
            <InfoWrapper type="Public repos:" info={ user.public_repos }/>
            <InfoWrapper type="Recent repo:" info={ latestRepo(user) }/>
            <InfoWrapper type="Recent activity:" info={ latestEvent(user) }/>
          </div>
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
