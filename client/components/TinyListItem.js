import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'

import './TinyListItem.sass'

class TinyListItem extends Component {

  render(){
    const { type, repo, payload } = this.props
    return (
      <Paper className="tiny-list-item" zDepth={1}>
        <span>{type}</span>
      </Paper>
    )
  }
}

export default TinyListItem
