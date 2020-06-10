import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, Card, Button } from '@material-ui/core';
import { loadIncidents, claimIncident } from './actions';
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
  'Claimed',
  'Finished'
];
const statusOrder = [
  'Unknown',
  'New',
  'Claimed',
  'Finished',
  'Canceled',
];

class ShopIncidentList extends Component {
  constructor(props) {
    super(props);
    this.renderIncidentClaim = this.renderIncidentClaim.bind(this);
  }
  renderIncidentClaim(i) {
    return () => {
      if (i.status !== 1) {
        return null;
      }
      return (
        <Button color="primary" variant="contained" onClick={() => this.props.claimIncident(i.incidentId)}>Claim</Button>
      );
    };
  }
  render() {
    return (
      <IncidentList
        header={this.props.shop && this.props.shop.name}
        suppressShop={true}
        {...this.props}
        statusNames={statusNames}
        statusOrder={statusOrder}
        renderAction={this.renderIncidentClaim}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const shops = state.currentUser.shops || [];
  const shopId = parseInt(ownProps.match.params.shopId);
  const shop = shops.find(s => s.shopId === shopId);
  return {
    shopId,
    shop,
    ...ownProps
  };
}

const actionCreators = (dispatch, ownProps) => ({
  claimIncident: (incidentId) => dispatch(claimIncident(ownProps.match.params.shopId, incidentId)),
});

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(ShopIncidentList));