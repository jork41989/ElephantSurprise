import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import ItemsIndex from "./items_index";
import ItemInject from "./item_inject";
const { CURRENT_USER, FETCH_USER, FETCH_WISHLIST} = Queries;

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

                let user = data.user;

                return(

                  <Query query={FETCH_WISHLIST}
                    variables={{ _id: this.props.match.params.id}} // this.props.match.params.id
                    >
                  {({loading, error, data}) => {
                    if (loading)
                      return "Loading...";
                    if (error)
                      return `Error! ${error.message}`;


                      // console.log("Wishlist", data)
                    
                    return (
                      <div className="ExchangeNacelle">
                        <h1>My Wish List</h1>
                        <ItemsIndex items={data.wish_list.items} />
                        <ItemInject user={user} wishlist="5dcc9aadb61a8950f661eae3"/> 
                      </div>

                    )
                  }}  

                </Query>
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