import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TinyListItem from '../components/TinyListItem'

import './GHDetail.sass'

const renderEvents = (user) => {
  if(!user || user === {} || !user.events) return ''
  return user.events.map((e, key) => {
    return <TinyListItem key={key} createdAt={e.created_at} type={e.type} repo={e.repo} payload={e.payload} />
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
          <div className="small-list repos">
            <h3>Repositories:</h3>
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
