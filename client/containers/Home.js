import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import GHList from '../containers/GHList'
import GHDetail from '../containers/GHDetail'
import SignIn from '../components/SignIn'

import './Home.sass'

class Home extends Component {

  render() {
    const { currentUser } = this.props

    return(
      <div>
        {
          currentUser ?
            <div className="home"><GHList /><GHDetail /></div> :
            <div className="center"><SignIn /></div>
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
