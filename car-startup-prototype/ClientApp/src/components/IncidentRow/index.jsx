import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  TextField,
  Chip, Divider, Typography,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import './styles.css';
import * as moment from 'moment';

class IncidentRow extends Component {
  renderDate() {
    if (!this.props.reportedDate) {
      return null;
    }
    const date = moment(this.props.reportedDate).format('dddd, MMMM Do YYYY');
    return (
      <Typography style={{ paddingTop: '10px' }}>Reported on {date}</Typography>
    );
  }
  renderShop() {
    if (
      this.props.status !== 3 ||
      !this.props.shop ||
      this.props.suppressShop
    ) {
      return null;
    }
    const { name, email, phone, address } = this.props.shop;
    return (
      <Fragment>
        <Divider />
        <div className="second-row">
          <div className="incident-shop">
            <Typography style={{ marginBottom: '10px' }}>{name} saw your incident and said they are available to help.</Typography>
            <Typography>
              <div className="shop-info">
                <div className="shop-info-section shop-name">
                  <div className="shop-info-label">Name</div>
                  <div className="shop-info-data">{name}</div>
                </div>
                <div className="shop-info-section shop-email">
                  <div className="shop-info-label">Email</div>
                  <div className="shop-info-data">{email}</div>
                </div>
                <div className="shop-info-section shop-phone">
                  <div className="shop-info-label">Phone</div>
                  <div className="shop-info-data">{phone}</div>
                </div>
                <div className="shop-info-section shop-address">
                  <div className="shop-info-label">Address</div>
                  <div className="shop-info-data">{address}</div>
                </div>
              </div>
            </Typography>

            {/*<TextField style={{ marginBottom: '10px' }} label="Shop Name" fullWidth defaultValue={name} InputProps={{ readOnly: true }} />
            <TextField style={{ marginBottom: '10px' }} label="Email" fullWidth defaultValue={email} InputProps={{ readOnly: true }} />
            <TextField style={{ marginBottom: '10px' }} label="Phone Number" fullWidth defaultValue={phone} InputProps={{ readOnly: true }} />
            <TextField style={{ marginBottom: '10px' }} label="Address" fullWidth defaultValue={address} InputProps={{ readOnly: true }} />*/}
          </div>
        </div>
        </Fragment>
    );
  }

  render() {
    return (
      <ExpansionPanel className="incident-panel">
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <div className="incident-row">
            <span className="car-model">
              <Typography variant="body2">{this.props.carModel}</Typography>
            </span>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="incident-details">
            <div className="first-row">
              <div className="incident-description">
                <Typography>{this.props.description}</Typography>
              </div>
              {this.props.renderAction()}
            </div>
            {this.renderDate()}
            {this.renderShop()}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}
    
export default connect(mapStateToProps)(IncidentRow);