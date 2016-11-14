import React, { Component, PropTypes } from 'react'
import { OAuthSignInButton } from 'redux-auth/material-ui-theme'

class SignIn extends Component {

  render() {
    return(
      <div className="sign-in">
        <OAuthSignInButton provider='github' />
      </div>
    )
  }
}

export default SignIn
