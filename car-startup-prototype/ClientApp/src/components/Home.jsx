import React, { Component } from 'react';
import { Paper, Typography } from "@material-ui/core";

export default class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <Paper style={{ margin: '10px', padding: '10px', width: 'calc(100% - 20px)' }}>
        <Typography variant="h1" className="hello">Hello!</Typography>
        <Typography>Welcome to [[Car Startup]].</Typography>
        <Typography>We'll have you set up to get your car fixed in no time.</Typography>
      </Paper>
    );
  }
}
