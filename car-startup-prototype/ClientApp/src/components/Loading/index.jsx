import './styles.css';
import React, { Component, Fragment } from 'react';

export default class LoadingSpinner extends Component {
  render() {
    return (
      <Fragment>
        <div className="overlay">
        </div>
        <div className="modal">
          <div className="lds-ring">
            <div /><div /><div /><div />
          </div>
        </div>
      </Fragment>
    );
  }
}