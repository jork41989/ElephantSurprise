import React, { Component } from "react";
import { Query } from "react-apollo";
import ExchangeShow from "./exchange_show";
import Queries from '../../graphql/queries';
import { withRouter } from 'react-router-dom';
const { CURRENT_USER, FETCH_USER } = Queries;

class ExchangeNacelle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={CURRENT_USER}>
        {({ loading, error, data }) => {

          return (
            <Query query={FETCH_USER}
              variables={{ _id: data.CurrentUserID }}
            >
              {({ loading, error, data }) => {
                if (loading)
                  return "Loading...";
                if (error)
                  return `Error! ${error.message}`;
                
                return (
                  <div className="ExchangeNacelle">
                    <ExchangeShow user={data.user} />
                  </div>
                )
              }
              }
            </Query>
          )
        }}
      </Query>)
  }
}

export default withRouter(ExchangeNacelle);