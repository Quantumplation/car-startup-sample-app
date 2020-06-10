import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, TextField, Button, Typography, CircularProgress, withStyles } from '@material-ui/core';
import LoadingSpinner from '../Loading';
import { signup, updateEmail, updatePassword } from './actions';

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
  error: {
    marginBottom: '10px'
  }
};

class Signup extends Component {
  displayName = Signup.name

  renderForm() {
    const { classes } = this.props;
    return (
      <div className={classes.signupForm}>
        <TextField className={classes.control} placeholder="Email" value={this.props.email} onChange={this.props.updateEmail} />
        <TextField className={classes.control} placeholder="Password" type="password" value={this.props.password} onChange={this.props.updatePassword} />
        <Button className={classes.control} variant="contained" color="primary" onClick={this.props.signup}>Signup</Button>
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
      return <Typography className={this.props.classes.error} variant="caption" color="secondary">{this.props.error}</Typography>;
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
          <Typography>
            To create a new account, enter your email and choose a password below:
          </Typography>
          {this.renderForm()}
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...state.userSignupForm,
    ...ownProps
  };
}

const actionCreators = {
  signup,
  updateEmail,
  updatePassword
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(Signup));