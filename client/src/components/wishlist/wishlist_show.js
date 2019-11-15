import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import ItemsIndex from "./items_index";
import ItemInject from "./item_inject";
import ShippingAddress from './shipping_address';
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


                      // console.log(data)
                    
                    return (
                      <div className="ExchangeNacelle">
                        <h1>My Wish List</h1>
                        <ShippingAddress 
                          wish_list_id={data.wish_list._id} 
                          shipping_address={data.wish_list.shipping_address}
                        />
                        <ItemsIndex items={data.wish_list.items} />
                        <ItemInject user={user} wishlist={data.wish_list._id}/> 
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