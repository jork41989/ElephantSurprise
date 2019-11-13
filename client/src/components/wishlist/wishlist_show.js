import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const {CURRENT_USER, FETCH_USER} = Queries;

class WishlistShow extends Component{
  constructor(props){
    super(props)
  }

  render(){

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
                // console.log(data)
                return (
                  <div className="ExchangeNacelle">
                    <ItemsIndex user={data.user} />
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
