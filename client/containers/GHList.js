import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader';

import GHListItem from '../components/GHListItem'

import { getFollowing } from '../actions/get-following'

class GHList extends Component {

  componentDidMount() {
    const { getFollowing, currentUser } = this.props
    getFollowing(currentUser.login)
  }

  render() {
    const { following } = this.props

    return(
      <div className="gh-list">
        <Subheader>Following</Subheader>
        {
          following.map((f, key) => {
            return <GHListItem user={f} key={key} />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    following: state.following,
    currentUser: state.currentUser.github
  }
}

export default connect(mapStateToProps, { getFollowing })(GHList)
