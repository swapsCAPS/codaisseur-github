import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'

import './TinyListItem.sass'

class TinyListItem extends Component {

  render(){
    const { head, sub, subsub } = this.props
    return (
      <Paper className="tiny-list-item" zDepth={1}>
        <span className="head">{head}</span>
        <span className="sub">{sub}</span>
        <span className="subsub">{subsub}</span>
      </Paper>
    )
  }
}

export default TinyListItem
