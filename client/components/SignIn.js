import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {fullWhite} from 'material-ui/styles/colors';

import api from '../middleware/api'

import './SignIn.sass'

class SignIn extends Component {

  render() {
    return(
      <Paper className="sign-in" zDepth={5}>
        <h1 className="si-header">Login:</h1>
        <RaisedButton
          className="si-button"
          label="GitHub"
          labelPosition="before"
          href="/auth/github"
          primary={true} />
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
