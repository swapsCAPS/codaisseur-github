import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { history } from '../store'
import { authenticate } from '../actions/set-current-user'

class SuccessAuth extends Component {
  componentWillMount() {
    this.props.authenticate()
  }

  render() {
    return(
      <div className="success-auth">
      </div>
    )
  }
}

export default connect(null, { authenticate })(SuccessAuth)
