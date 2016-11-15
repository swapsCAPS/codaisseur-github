import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GHList from '../containers/GHList'
import SignIn from '../components/SignIn'

class Home extends Component {

  render() {
    const { currentUser } = this.props

    return(
      <div>
        {
          currentUser ?
          <GHList /> :
          <SignIn />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {})(Home)
