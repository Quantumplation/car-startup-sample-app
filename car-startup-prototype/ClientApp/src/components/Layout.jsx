import React, { Component } from 'react';
import NavMenu from './NavMenu';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <div>
        <NavMenu />
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          height: "calc(100vh - 76px)"
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
