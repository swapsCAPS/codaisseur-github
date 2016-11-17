import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TinyListItem from '../components/TinyListItem'

import './GHDetail.sass'

const renderEvents = (user) => {
  if(!user || user === {} || !user.events) return ''
  return user.events.map((e, key) => {
    return <TinyListItem key={key} head={e.type} sub={e.repo.name} subsub={e.created_at} />
  })
}

const renderRepos = (user) => {
  if(!user || user === {} || !user.repos) return ''
  return user.repos.map((r, key) => {
    return <TinyListItem key={key} head={r.name} sub={'Created: ' + r.created_at} />
  })
}

class GHListItem extends Component {

  render(){
    const { user } = this.props
    return (
      <Paper className="detail" zDepth={5}>
        <h1>{user.login}</h1>
        <Paper className="container" zDepth={1}>
          <div className="events">
            <h3>Events:</h3>
            <div className="small-list">
              {renderEvents(user)}
            </div>
          </div>
          <div className="repos">
            <h3>Repositories:</h3>
            <div className="small-list">
              {renderRepos(user)}
            </div>
          </div>
        </Paper>
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.selectedUser
  }
}

export default connect(mapStateToProps, {})(GHListItem)
