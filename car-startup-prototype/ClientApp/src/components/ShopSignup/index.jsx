import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, TextField, Button, Typography, CircularProgress, withStyles } from '@material-ui/core';
import LoadingSpinner from '../Loading';
import { signup, updateForm } from './actions';

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

class ShopSignup extends Component {
  displayName = ShopSignup.name

  renderForm() {
    const { classes } = this.props;
    return (
      <div className={classes.signupForm}>
        <TextField className={classes.control} placeholder="Shop Name" value={this.props.name} onChange={this.props.updateName} />
        <TextField className={classes.control} placeholder="Shop Email" value={this.props.email} onChange={this.props.updateEmail} />
        <TextField className={classes.control} placeholder="Phone Number" value={this.props.phone} onChange={this.props.updatePhone} />
        <TextField className={classes.control} placeholder="Address" value={this.props.address} onChange={this.props.updateAddress} />
        <TextField className={classes.control} placeholder="Manager Account" value={this.props.managerEmail} onChange={this.props.updateManager} />
        <Button className={classes.control} variant="contained" color="primary" onClick={this.props.signup}>Signup Shop</Button>
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
      return <Typography className={this.props.classes.status} variant="caption" style={{ color: '#27ae60' }}>Shop successfully created!</Typography>
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
          <Typography>
            To register a new shop, enter details below:
          </Typography>
          {this.renderForm()}
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.shopSignupForm,
    ...ownProps
  };
}

const actionCreators = {
  signup,
  updateName: updateForm('name'),
  updateEmail: updateForm('email'),
  updatePhone: updateForm('phone'),
  updateAddress: updateForm('address'),
  updateManager: updateForm('managerEmail')
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(ShopSignup));