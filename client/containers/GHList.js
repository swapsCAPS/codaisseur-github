import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import GHListItem from '../components/GHListItem'

import './GHList.sass'

import { setNeedsUpdate, resetSelectedUser, resetFollowing, getFollowing, sortFollowing } from '../actions/get-following'

class GHList extends Component {
  state = {
    orderBy: 1,
    asc: true
  }

  setOrderBy(event, index, orderBy) {
    this.setState({orderBy})
    this.sort(orderBy, this.state.asc)
  }

  setAscDesc(event, index, asc){
    this.setState({asc})
    this.sort(this.state.orderBy, asc)
  }

  sort(orderBy = 1, asc = true){
    const { sortFollowing } = this.props
    switch(orderBy){
      case 1:
        return sortFollowing('login', asc)
      case 2:
        return sortFollowing('publicRepos', asc)
      case 3:
        return sortFollowing('latestEvent', asc)
    }
  }

  refresh() {
    const { setNeedsUpdate, resetSelectedUser, resetFollowing, getFollowing, currentUser } = this.props
    setNeedsUpdate(true)
    this.setState({ orderBy: 1, asc: true })
    resetFollowing()
    resetSelectedUser()
    getFollowing(currentUser.login)
  }

  componentWillMount() {
    const { needsUpdate, getFollowing, currentUser } = this.props
    if(!needsUpdate) return
    getFollowing(currentUser.login)
  }

  render() {
    const { following } = this.props

    return(
      <Paper zDepth={5} className="main">
        <div className="header">
          <RaisedButton
            className="button"
            label="Refresh"
            labelPosition="before"
            onClick={this.refresh.bind(this)}
            primary={true} />
          <div className="orderby-wrapper">
            <SelectField
              style={{marginRight: 8, width: 138}}
              floatingLabelText="Order by"
              value={this.state.orderBy}
              onChange={this.setOrderBy.bind(this)}>
              <MenuItem value={1} primaryText="Username" />
              <MenuItem value={2} primaryText="Public repos" />
              <MenuItem value={3} primaryText="Latest event" />
            </SelectField>
            <SelectField
              style={{width: 120}}
              floatingLabelText="Sort"
              value={this.state.asc}
              onChange={this.setAscDesc.bind(this)} >
              <MenuItem value={true} primaryText="Ascending" />
              <MenuItem value={false} primaryText="Descending" />
            </SelectField>
          </div>
        </div>
        <div className="list">
          <div className="content">
          {
            following.map((f, key) => {
              return <GHListItem user={f} key={key} />
            })
          }
          </div>
        </div>
    </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    following: state.following,
    currentUser: state.currentUser.github,
    needsUpdate: state.needsUpdate,
  }
}

export default connect(mapStateToProps, { setNeedsUpdate, resetSelectedUser, resetFollowing, getFollowing, sortFollowing })(GHList)
