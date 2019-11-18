import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import ItemsIndex from "./items_index";
import ItemInject from "./item_inject";
import ShippingAddress from './shipping_address';
import './wishlist_show.css'
const { CURRENT_USER, FETCH_USER, FETCH_WISHLIST} = Queries;

class WishlistShow extends Component{
  constructor(props){
    super(props)
    this.state = {
      sidebar: false
    }
    this.renderHelp = this.renderHelp.bind(this)
  }


  renderHelp() {
    let bodyDiv = document.getElementById('wishBody')
    let sideDiv = document.getElementById('wishSidebar')

    if (this.state.sidebar) {
      bodyDiv.style.width = "100%"
      sideDiv.classList.remove('-showSide')
      this.setState({ sidebar: false })
    } else {
      bodyDiv.style.width = "75%"
      sideDiv.classList.add('-showSide')
      this.setState({ sidebar: true })
    }
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


                    let total_amount = 0;
                    if (data.wish_list.items.length > 0) {
                      data.wish_list.items.forEach(
                        item => {
                          if (item.purchased) {
                            total_amount += item.price;
                          }
                        }
                      );
                    }
                    
                    
                    if (data.wish_list.owner._id === user._id){

                      return (
                        <div className="whishlistShowMain">
                        <div className="whishlistShowBody" id="wishBody">
                          <h1>My Wish List</h1>
                            <i class="fas fa-plus-square sidebarButtonAlt" onClick={this.renderHelp}></i>
                          <ShippingAddress 
                            wish_list={data.wish_list} 
                            shipping_address={data.wish_list.shipping_address}
                            current_user={user}
                            />
                          <ItemsIndex user={user._id}
                          items={data.wish_list.items} 
                          wishlist={this.props.match.params.id}
                          owner={data.wish_list.owner._id} />
                       
                      </div>
                      <div className="whishlistShowSideBar" id="wishSidebar">
                           
                            <ItemInject user={user} wishlist={this.props.match.params.id} renderHelp={this.renderHelp} /> 
                      </div>
                      </div>

                      )
                    } else {
                      return(

                        <div className="ExchangeNacelle">
                        <h1>{data.wish_list.owner.name}'s Wish List</h1>
                        <ShippingAddress
                          wish_list={data.wish_list}
                          shipping_address={data.wish_list.shipping_address}
                          current_user={user}
                        />
                        <div>Total purchased amount: ${total_amount}</div>
                        <ItemsIndex user={user._id}
                        items={data.wish_list.items}
                        wishlist={this.props.match.params.id}
                        owner={data.wish_list.owner._id}
                        santa={data.wish_list.santa} 
                        host={data.wish_list.exchange.host}/>
                      </div>
                      )
                    }
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