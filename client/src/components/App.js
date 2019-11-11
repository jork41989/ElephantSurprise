import React from 'react';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import Login from './auth/login';
import SignUp from './auth/signup';
import Dashboard from './dashboard/dashboard'

import AuthRoute from '../util/route_util';
import Nav from './nav';
import "./nav.css"

function App() {
  return (
    <div>
      <div className={"navBarMain"}> 
        <Link to='/' className={"logoNav"}><img src="https://img.icons8.com/carbon-copy/100/000000/elephant.png" className="elenav"/><h1>Elephant Surprise</h1></Link>
        <Nav /> 
      </div>
      <div className="mainBody">
        <Switch>
          <AuthRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>

    </div>
  );
}

export default withRouter(App);
