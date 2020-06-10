import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Layout } from './components/Layout';
import Routes from './routes';
import { checkCookie } from './actions';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  displayName = App.name

  componentWillMount() {
    this.props.checkCookie();
  }
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <CssBaseline />
          <Routes />
        </Layout>
      </ConnectedRouter>
    );
  }
}

const actionCreators = {
  checkCookie
};

export default connect(null, actionCreators)(App);