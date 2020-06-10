import React from 'react';
import { Fragment, Component } from 'react';
import { Route } from 'react-router';
import Home from './components/Home';
import UserSignup from './components/UserSignup';
import ShopSignup from './components/ShopSignup';
import IncidentCreate from './components/IncidentCreation';
import Login from './components/Login';
import Logout from './components/Logout';
import AdminPage from './components/Admin';
import UserIncidentList from './components/UserIncidentList';
import ShopIncidentList from './components/ShopIncidentList';

export default class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={UserSignup} />
        <Route exact path="/new-shop" component={ShopSignup} />
        <Route exact path="/new-incident" component={IncidentCreate} />
        <Route exact path="/incidents" component={UserIncidentList} />
        <Route exact path="/shops/:shopId" component={ShopIncidentList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/admin" component={AdminPage} />
      </Fragment>
    );
  }
}