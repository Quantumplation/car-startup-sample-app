import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Button, withStyles, Menu, MenuItem } from "@material-ui/core";
import MenuIcon  from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    fontFamily: '\'Lalezar\', cursive !important',
    fontSize: '22pt',
    paddingTop: '3px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10
  }
};

class NavMenu extends Component {
  displayName = NavMenu.name
  state = { anchorEl: null }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderCurrentUser() {
    if (this.props.currentUser) {
      let email = this.props.currentUser.email;
      // If the email is too long, just take the pre @ part
      if (email.length > 25) {
        email = email.split('@')[0];
      }
      return <Typography color="inherit">{email}</Typography>;
    }
    return null;
  }
  renderAdmin() {
    if (this.props.currentUser && this.props.currentUser.isAdmin) {
      return (
        <MenuItem onClick={this.handleClose}>
          <Link to="/admin">Admin</Link>
        </MenuItem>
      );
    }
    return null;
  }
  renderShopSignup() {
    if (this.props.currentUser && this.props.currentUser.isAdmin) {
      return (
        <MenuItem onClick={this.handleClose}>
          <Link to="/new-shop">New Shop</Link>
        </MenuItem>
      );
    }
  }
  renderIncidentCreate() {
    if (this.props.currentUser) {
      return (
        <MenuItem onClick={this.handleClose}>
          <Link to="/new-incident">Report Incident</Link>
        </MenuItem>
      );
    }
    return null;
  }
  renderIncidentList() {
    if (this.props.currentUser) {
      return (
        <MenuItem onClick={this.handleClose}>
          <Link to="/incidents">My Incidents</Link>
        </MenuItem>
      );
    }
    return null;
  }
  renderShops() {
    if (this.props.shops) {
      return this.props.shops.map(s => (
        <MenuItem key={s.shopId} onClick={this.handleClose}>
          <Link to={`/shops/${s.shopId}`}>{s.name}</Link>
        </MenuItem>
      ));
    }
    return null;
  }
  renderLogin() {
    if (!this.props.currentUser) {
      return (
        <MenuItem onClick={this.handleClose}>
          <Link to="/login">Login</Link>
        </MenuItem>
      );
    }
    return null;
  }
  renderSignup() {
    if (!this.props.currentUser) {
      return (
        <MenuItem onClick={this.handleClose}>
          <Link to="/signup">Signup</Link>
        </MenuItem>
      );
    }
    return null;
  }
  renderLogout() {
    if (this.props.currentUser) {
      return (
        <MenuItem onClick={this.handleClose}>
          <Link to="/logout">Logout</Link>
        </MenuItem>
      );
    }
    return null;
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Link to="/">Home</Link>
              </MenuItem>
              {this.renderAdmin()}
              {this.renderShopSignup()}
              {this.renderIncidentCreate()}
              {this.renderIncidentList()}
              {this.renderShops()}
              {this.renderLogin()}
              {this.renderSignup()}
              {this.renderLogout()}
            </Menu>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              [[Car Startup]]
            </Typography>
            {this.renderCurrentUser()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.currentUser.user,
    shops: state.currentUser.shops,
    ...ownProps
  };
}

const actionCreators = {};

export default withStyles(styles)(
  connect(mapStateToProps, actionCreators)(NavMenu)
);
