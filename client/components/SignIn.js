import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import api from '../middleware/api'

class SignIn extends Component {
  renderUser(user){
    return (
      ( user.login )
    )
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  logOut(){
    api.signOut()
  }

  render() {
    return(
      <div>
        <div className="sign-in">
        {
          this.props.token ?
          <span>{this.props.token}</span> :
          <a href="/auth/github/">Sign in with Github</a>
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, {})(SignIn)
