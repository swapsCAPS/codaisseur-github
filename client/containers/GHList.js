import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader';

import { getFollowing } from '../actions/get-following'

import GHListItem from '../components/GHListItem'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import SetUsername from '../components/SetUsername'

const style = {
  marginLeft: 24,
  marginRight: 24,
}

class GHList extends Component {

  componentDidMount() {
    this.props.getFollowing()
  }

  render() {
    const { following } = this.props

    return(
      <div style={style} className="gh-list">
        <SetUsername />
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
    following: state.following
  }
}

export default connect(mapStateToProps, { getFollowing })(GHList)
