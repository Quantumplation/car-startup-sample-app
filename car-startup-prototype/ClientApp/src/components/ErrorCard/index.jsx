import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import './styles.css';

export default class ErrorCard extends Component {
  render() {
    return (
      <Card className="error-card">
        <Typography variant="h6" style={{
          color: '#ecf0f1',
          backgroundColor: '#c0392b',
          padding: '5px'
        }}>
          Somethings not quite right...
        </Typography>
        <div className="error-card-body">
          <Typography>
            {this.props.error}
          </Typography>
          <div className="error-card-actions">
            {this.props.children.length > 1 ?
              <Typography>
                Here are some things you can try:
              </Typography>
              : null}
            {this.props.children}
          </div>
          </div>
      </Card>
    );
  }
}