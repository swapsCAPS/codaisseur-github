import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import GHListItem from '../components/GHListItem'

import { getFollowing, sortFollowing } from '../actions/get-following'

class GHList extends Component {
  state = {
    orderBy: 1,
    asc: true
  }

  setOrderBy(event, index, orderBy) {
    this.setState({orderBy})
    this.sort(this.state.asc)
  }

  setAscDesc(event, index, asc){
    this.setState({asc})
    this.sort(asc)
  }

  sort(asc){
    const { sortFollowing } = this.props
    switch(this.state.orderBy){
      case 1:
        return sortFollowing('login', asc)
      case 2:
        return sortFollowing('repoAmount', asc)
    }
  }

  componentWillMount() {
    const { getFollowing, currentUser } = this.props
    getFollowing(currentUser.login)
  }

  render() {
    const { following } = this.props

    return(
      <div className="gh-list">
        <Subheader>Following</Subheader>
        <SelectField
          floatingLabelText="Order by"
          value={this.state.orderBy}
          onChange={this.setOrderBy.bind(this)}
        >
          <MenuItem value={1} primaryText="Username" />
          <MenuItem value={2} primaryText="Repo amount" />
        </SelectField>
        <SelectField
          floatingLabelText="Sort"
          value={this.state.asc}
          onChange={this.setAscDesc.bind(this)}
        >
          <MenuItem value={true} primaryText="Ascending" />
          <MenuItem value={false} primaryText="Descending" />
        </SelectField>
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

export default connect(mapStateToProps, { getFollowing, sortFollowing })(GHList)
