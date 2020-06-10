import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  withStyles, Typography, Card, Button,
  List, ListSubheader, ListItem,
  Snackbar, SnackbarContent
} from '@material-ui/core';
import { Link } from "react-router-dom";
import { loadIncidents } from './actions';
import IncidentRow from '../IncidentRow';
import LoadingSpinner from '../Loading';
import ErrorCard from '../ErrorCard';
import './styles.css';

const styles = {
  root: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center'
  }
};

class IncidentList extends Component {
  componentWillMount() {
    this.props.loadIncidents(this.props.shopId, true);
  }  
  renderContent() {
    if (this.props.error) {
      return (
        <ErrorCard error={this.props.error}>
          <Link to="/">Return to home page</Link>
          <Link to="/logout">Log out</Link>
        </ErrorCard>
      );
    } else {
      return (
        <Card className="incident-list-container">
          <Typography variant="h5">{this.props.header}</Typography>
          <div className="incident-list-wrapper">
            {this.renderIncidents()}
          </div>
        </Card>
      );
    }
  }
  renderLoading() {
    if (this.props.isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  }
  renderIncidentRow(i) {
    return (
      <ListItem style={{ padding: '0px 2px' }}>
        <IncidentRow key={i.incidentId} {...i} statusNames={this.props.statusNames} renderAction={this.props.renderAction(i)} suppressShop={this.props.suppressShop} />
      </ListItem>
    );
  }
  renderIncidentsWithStatus(status, incidents) {
    if (!incidents || incidents.length <= 0) {
      return null;
    }
    return (
      <li key={status}>
        <ul style={{ padding: '0px' }}>
          <ListSubheader style={{ background: "#ecf0f1" }}>{status}</ListSubheader>
          {incidents.map(i => this.renderIncidentRow(i))}
        </ul>
      </li>
    );
  }
  renderIncidents() {
    const incidentsByStatus = {};
    for (const incident of this.props.incidents) {
      const statusName = this.props.statusNames[incident.status];
      const incidentsForStatus = incidentsByStatus[statusName] || [];
      incidentsForStatus.push(incident);
      incidentsByStatus[statusName] = incidentsForStatus;
    }
    return (
      <List subheader={<li />}>
        {this.props.statusOrder.map(s => this.renderIncidentsWithStatus(s, incidentsByStatus[s]))}
      </List>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderLoading()}
        {this.renderContent()}
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.incidentList,
    ...ownProps
  };
}

const actionCreators = {
  loadIncidents
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(IncidentList));