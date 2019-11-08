import React from 'react';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import Login from './auth/login';
import SignUp from './auth/signup';

import AuthRoute from '../util/route_util';
import Nav from './nav';

function App() {
  return (
    <div>
      <Link to='/'><h1>Elephant Surprise</h1></Link>
      <Nav/>
      <Switch/>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={SignUp} routeType="auth" />
      <Switch/>

    </div>
  );
}

export default withRouter(App);
