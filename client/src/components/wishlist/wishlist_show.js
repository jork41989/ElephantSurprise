import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import ItemsIndex from "./items_index";
import ItemInject from "./item_inject";
const {CURRENT_USER, FETCH_USER} = Queries;

class WishlistShow extends Component{
  constructor(props){
    super(props)
    // sacrifice
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

                console.log(this.props.exchange)

                return (
                  <div className="ExchangeNacelle">
                    <h1>My Wish List</h1>
                    <ItemsIndex items={data.user.owned_lists} />
                    <ItemInject />
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

export default withRouter(WishlistShow);