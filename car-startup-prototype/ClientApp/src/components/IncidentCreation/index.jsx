import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, TextField, Button, Typography, CircularProgress, withStyles } from '@material-ui/core';
import LoadingSpinner from '../Loading';
import { createIncident, updateForm } from './actions';

const styles = {
  root: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    padding: '10px'
  },
  signupForm: {
    display: 'flex',
    flexFlow: 'column'
  },
  control: {
    padding: '10px 0px'
  },
  status: {
    marginBottom: '10px'
  }
};

class IncidentCreation extends Component {
  displayName = IncidentCreation.name

  renderForm() {
    if (this.props.success) {
      return null;
    }
    const { classes } = this.props;
    return (
      <div>
        <Typography>
          Something wrong with your car?  Enter the details below, and we'll find a shop for you:
        </Typography>

        <div className={classes.signupForm}>
          <TextField className={classes.control} placeholder="Car Model" value={this.props.carModel} onChange={this.props.updateCarModel} />
          <TextField className={classes.control} placeholder="Description" value={this.props.description} onChange={this.props.updateDescription} />
          <Button className={classes.control} variant="contained" color="primary" onClick={this.props.createIncident}>Report Incident</Button>
        </div>
      </div>
    );
  }

  renderLoading() {
    if (this.props.isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  }
  renderError() {
    if (this.props.error) {
      return <Typography className={this.props.classes.status} variant="caption" color="secondary">{this.props.error}</Typography>;
    }
    return null;
  }
  renderSuccess() {
    if (this.props.success) {
      return (
        <div>
          <Typography
            className={this.props.classes.status}
            variant="caption"
            style={{ color: '#27ae60' }}
          >
            Your incident has been recorded.
          </Typography>
          <Typography
            className={this.props.classes.status}
            variant="caption"
            style={{ color: '#27ae60' }}
          >
            Local shops are reviewing it now!
          </Typography>

        </div>
      );
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderLoading()}
        <Paper className={classes.paper}>
          {this.renderError()}
          {this.renderSuccess()}
          {this.renderForm()}
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.incidentCreateForm,
    ...ownProps
  };
}

const actionCreators = {
  createIncident,
  updateCarModel: updateForm('carModel'),
  updateDescription: updateForm('description'),
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(IncidentCreation));