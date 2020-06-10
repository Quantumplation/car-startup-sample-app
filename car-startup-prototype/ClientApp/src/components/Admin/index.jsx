import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, CircularProgress, Card } from '@material-ui/core';
import { loadUsers, loadShops, loadIncidents } from './actions';

class AdminPage extends Component {
  componentWillMount() {
    this.props.loadUsers();
    this.props.loadShops();
    this.props.loadIncidents();
  }
  render() {
    return (
      <div>
        <Card style={{ margin: '10px', padding: '10px' }}>
          <Typography variant="h5">Users</Typography>
          <ul>
            {this.props.users.map(e => <li key={e}>{e}</li>)}
          </ul>
        </Card>
        <Card style={{ margin: '10px', padding: '10px' }}>
          <Typography variant="h5">Shops</Typography>
          <ul>
            {this.props.shops.map(s => <li key={s.name}>{s.name}</li>)}
          </ul>
        </Card>

        <Card style={{ margin: '10px', padding: '10px' }}>
          <Typography variant="h5">Incidents</Typography>
          <ul>
            {this.props.incidents.map((i, idx) => <li key={idx}>{i.carModel} - {i.description}</li>)}
          </ul>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.adminPage,
    ...ownProps
  };
}

const actionCreators = {
  loadUsers,
  loadShops,
  loadIncidents
};

export default connect(mapStateToProps, actionCreators)(AdminPage);