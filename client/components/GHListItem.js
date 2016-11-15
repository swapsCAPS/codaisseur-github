import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import setUsername from '../actions/set-current-user'
import { getRepos } from '../actions/get-following'

const globalStyle = {
  marginBottom: 8,
  height: 128,
  paddingTop: 3,
  display: 'flex',
  flexDirection: 'row'

}

const avatarStyle = {
  marginBottom: 8,
  marginLeft: 8,
  height: 128,
  paddingTop: 3,
  display: 'flex',
  flexDirection: 'column'
}

const usernameStyle = {
  margin: 0,
  marginLeft: 4,
  marginTop: 0,
  width: 100,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

class GHListItem extends Component {

  getAvatar(userId){
    return `https://avatars1.githubusercontent.com/u/${userId}?v=3&s=90`
  }

  render(){
    const { user, setUsername, getRepos } = this.props

    return (
      <Paper className="list-item" zDepth={2}>
        <div>
          <Avatar size={100} src={this.getAvatar(user.id)}/>
          <h3 style={usernameStyle}>{user.login}</h3>
        </div>
        <div>
        </div>
        <div>
          <a href={user.repos_url}>Repos: {user.repos ? user.repos.length : 'Not found'}</a>
          <a href={user.organizations_url}>Organizations</a>
        </div>
      </Paper>
    )
  }
}

export default connect(null, { setUsername, getRepos })(GHListItem)
