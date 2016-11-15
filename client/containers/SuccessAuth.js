import React, { Component, PropTypes } from 'react'
import api from '../middleware/api'

class SuccessAuth extends Component {
  componentWillMount() {
    api.authenticate();
  }

  render() {
    return(
      <div className="success-auth">
      </div>
    )
  }
}

export default SuccessAuth
