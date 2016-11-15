import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'

import api from '../middleware/api'

class SignIn extends Component {

  render() {
    return(
      <Paper className="sign-in">
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, {})(SignIn)
