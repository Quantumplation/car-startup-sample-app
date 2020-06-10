import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, Card, Button, List, ListSubheader, ListItem } from '@material-ui/core';
import { cancelIncident } from './actions';
import IncidentList from '../IncidentList';
import './styles.css';

const styles = {
  root: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center'
  }
};

const statusNames = [
  'Unknown',
  'New',
  'Canceled',
  'Accepted',
  'Finished'
];
const statusOrder = [
  'Unknown',
  'Accepted',
  'New',
  'Finished',
  'Canceled',
];

class UserIncidentList extends Component {
  constructor(props) {
    super(props);
    this.renderIncidentCancel = this.renderIncidentCancel.bind(this);
  }
  renderIncidentCancel(i) {
    return () => {
      if (i.status === 2 || i.status === 4) {
        return null;
      }
      return (
        <Button
          className="cancel-button"
          color="secondary"
          variant="outlined"
          onClick={() => this.props.cancelIncident(i.incidentId)}
        >
          Cancel
        </Button>
      );
    };
  }
  render() {
    return (
      <IncidentList
        header="My Incidents"
        {...this.props}
        statusNames={statusNames}
        statusOrder={statusOrder}
        renderAction={this.renderIncidentCancel}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}

const actionCreators = (dispatch, ownProps) => ({
  cancelIncident: (incidentId) => dispatch(cancelIncident(incidentId)),
});

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(UserIncidentList));