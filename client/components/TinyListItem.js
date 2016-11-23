import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Paper from 'material-ui/Paper'
import { dateTime } from '../helpers/properDate.js'
import { goToCommit } from '../actions/get-following'

import './TinyListItem.sass'

const NORMAL = 32
const EXPANDED = 200
const NORMAL_DEPTH = 1
const EXPANDED_DEPTH = 2


class TinyListItem extends Component {
  state = {
    expanded: false,
    height: NORMAL,
    depth: NORMAL_DEPTH
  }

  renderContent(event) {
    if(!event) return ( <span>No event : (</span> )
    if(!event.payload) return ( <span>No payload : (</span> )
    if(!event.payload.commits) return ( <span>No commits : (</span> )
    if(event.payload.commits.length > 0) {
      return (
        <div>
          <div className="li-divider" />
          <div className="li-content">
            {
              event.payload.commits.map((c, i) => {
                return (
                  <span key={i} onClick={ this.props.goToCommit.bind(this, c.url) }className="li-commit-msg wrap-text">{ c.message }</span>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  expand() {
    console.log('expand')
    if(this.state.expanded === false){
      this.setState({ height: EXPANDED, depth: EXPANDED_DEPTH, expanded: true })
    }
    if(this.state.expanded === true){
      this.setState({ height: NORMAL, depth: NORMAL_DEPTH, expanded: false })
    }
  }

  render(){
    const { event } = this.props
    return (
      <Paper style={{height: this.state.height}} onClick={this.expand.bind(this)} className="tiny-list-item" zDepth={this.state.depth}>
        <div className="li-header">
          <span className="li-head wrap-text">{ event.payload.commits.length + ' commits' }</span>
          <span className="li-sub wrap-text">{ event.repo.name }</span>
          <span className="li-subsub wrap-text">{ dateTime(event.created_at) }</span>
        </div>
        { this.state.expanded ? this.renderContent(event) : null }
      </Paper>
    )
  }
}

export default connect(null, { goToCommit })(TinyListItem)
