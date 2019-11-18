import React from 'react';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import Dashboard from './dashboard/dashboard'
import ExchangeForm from './ExchangeForm/exchangeForm'
import ExchangeNacelle from './exchange/exchange-nacelle'
import elephant from '../images/logo-v1.png'
import AuthRoute from '../util/route_util';
import Nav from './nav';
import WishlistShow from './wishlist/wishlist_show';
import Splash from '../components/splash/splash'
import "./nav.css"

function App() {
  return (
    <div>
      <div className={"navBarMain"}> 
        <Link to='/' className={"logoNav"}><img src={elephant} className="elenav"/><h1>Elephant Surprise</h1></Link>
        <Nav /> 
      </div>
      <div className="mainBody">
        <Switch>
          <AuthRoute exact path="/dashboard" component={Dashboard} />
          <AuthRoute exact path="/wish_lists/:id" component={WishlistShow} />
          <AuthRoute exact path="/newExchange" component={ExchangeForm} />
          <AuthRoute exact path="/exchanges/:id" component={ExchangeNacelle} />
          <Route exact path="/" component={Splash} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
