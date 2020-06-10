import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';


class Logout extends Component {
  componentWillMount() {
    this.props.logout();
  }
  render() {
    return null;
  }
}

const actionCreators = {
  logout
};

export default connect(null, actionCreators)(Logout);