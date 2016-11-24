import React, { Component, PropTypes } from 'react'
import { history } from '../store'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import ActionHome from 'material-ui/svg-icons/action/home';

class Header extends Component {

  navigateHome() {
    history.push('/')
  }

  render() {
    return (
      <AppBar
        zDepth={2}
        title="GitView"
        iconElementLeft={ <IconButton onClick={ this.navigateHome }><ActionHome /></IconButton> }
      />
    )
  }
}

export default Header

