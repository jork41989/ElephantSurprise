import React, { Component } from "react";
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

import { ApolloConsumer } from 'react-apollo';
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

class App extends Component {

  constructor(props){
    super(props)
  }

  render(){

  return(


  <ApolloConsumer>
    {client => (
      <Query query={IS_LOGGED_IN}>
        {({ data }) => {
          if (data.isLoggedIn) {
            return (
              <div>
                <div className={"navBarMain"}>
                  <Link to='/' className={"logoNav"}><img src={elephant} className="elenav" /><h1>Elephant Surprise</h1></Link>
                  <Nav />
                </div>
                <div className="mainBody">
                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <AuthRoute exact path="/wish_lists/:id" component={WishlistShow} />
                    <AuthRoute exact path="/newExchange" component={ExchangeForm} />
                    <AuthRoute exact path="/exchanges/:id" component={ExchangeNacelle} /> 
                    <AuthRoute exact path="/dashboard" component={Dashboard} />
                   </Switch>
                </div>
              </div>
              );
              } else {
                return (
                  <div>
                    <div className={"navBarMain"}>
                      <Link to='/' className={"logoNav"}><img src={elephant} className="elenav" /><h1>Elephant Surprise</h1></Link>
                      <Nav />
                    </div>
                    <div className="mainBody">
                        <Route exact path="/" component={Splash} />
                    </div>
                  </div>
                );

          }
        }}
      </Query>
    )}
  </ApolloConsumer>

  )}
}

export default withRouter(App);
