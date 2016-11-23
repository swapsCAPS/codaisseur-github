import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'

import './TinyListItem.sass'

const NORMAL = 52
const EXPANDED = 200

class TinyListItem extends Component {
  state = {
    height: NORMAL
  }

  expand() {
    console.log('expand')
    if(this.state.height === NORMAL){
      this.setState({ height: EXPANDED })
    }
    if(this.state.height === EXPANDED){
      this.setState({ height: NORMAL })
    }
  }

  render(){
    const { head, sub, subsub } = this.props
    return (
      <Paper style={{height: this.state.height}} onClick={this.expand.bind(this)} className="tiny-list-item" zDepth={1}>
        <span className="head">{head}</span>
        <span className="sub">{sub}</span>
        <span className="subsub">{subsub}</span>
      </Paper>
    )
  }
}

export default TinyListItem
