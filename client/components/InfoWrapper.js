import React, { Component, PropTypes } from 'react'
import './InfoWrapper.sass'

class InfoWrapper extends Component {
  render(){
    const { type, info } = this.props
    return (
      <div className="info-wrapper">
        <span className="type">{type}</span>
        <span className="info">{info}</span>
      </div>
    )
  }
}

export default InfoWrapper
