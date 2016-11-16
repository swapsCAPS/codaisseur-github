import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'

import './GHListItem.sass'

class GHListItem extends Component {

  getAvatar(userId){
    return `https://avatars1.githubusercontent.com/u/${userId}?v=3&s=90`
  }

  render(){
    const { user } = this.props
    return (
      <Paper className="list-item" zDepth={2}>
        <div className="avatar-container">
          <Avatar className="avatar" size={100} src={this.getAvatar(user.id)}/>
          <h3 className="username">{user.login}</h3>
        </div>
        <div className="content-container">
          <div className="info-container">
            <div className="info-wrapper">
              <span className="type">Name:</span>
              <span className="info">{user.name ? user.name : 'Name unknown'}</span>
            </div>
            <div className="info-wrapper">
              <span className="type">Email:</span>
              <span className="info">{user.email ? user.email : 'Email unknown'}</span>
            </div>
            <div className="info-wrapper">
              <span className="type">Public repos:</span>
              <span className="info">{user.public_repos}</span>
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

export default connect(null, { })(GHListItem)
