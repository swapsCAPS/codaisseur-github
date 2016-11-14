import React, { Component, PropTypes } from 'react'
import SignIn from '../components/SignIn'

class Home extends Component {

  render() {
    return(
      <div className="home">
        <SignIn />
      </div>
    )
  }
}

export default Home
