import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TinyListItem from '../components/TinyListItem'

import './GHList.sass'

const expandItem = (key) => {

}

const renderEvents = (user) => {
  if(!user || user === {} || !user.events) return ''
  return user.events.map((e, key) => {
    return <TinyListItem key={key} event={e}/>
  })
}

const renderRepos = (user) => {
  if(!user || user === {} || !user.repos) return ''
  return user.repos.map((r, key) => {
    return <TinyListItem key={key} head={r.name} sub={'Created: ' + r.created_at} />
  })
}

class GHDetail extends Component {

  render(){
    const { user } = this.props
    return (
      <Paper className="main" zDepth={5}>
        <div className="header detail">
          <h1>{user.login}</h1>
        </div>
        <div className="events">
          <div className="list">
            <div className="content">
              {renderEvents(user)}
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.selectedUser
  }
}

export default connect(mapStateToProps, {})(GHDetail)
