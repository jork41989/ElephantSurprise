  import React, {Component} from "react";
  import {withRouter} from "react-router-dom";
  import { Query, Mutation} from "react-apollo";
  import {merge} from "lodash"
  import Queries from "../../graphql/queries";
  import ExchangeUsers from "./exchange_users";
  import Mutations from "../../graphql/mutations";
  import InviteUser from "./invite_user";
  import WishlistShow from "../wishlist/wishlist_show";
  import './exchange_show.css';
  import Modal from '../modal/modal';
  import { some } from 'lodash';
  const { REMOVE_EXCHANGE } = Mutations
const { FETCH_EXCHANGE, CURRENT_USER, FETCH_USER } = Queries;


class ExchangeShow extends Component {

  constructor(props){
    super(props);

    this.state = {
      modal: false,
      type: ""
    }

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modal: false, type: false })
  }

  updateCache(cache, { data: { deleteExchange: oldExchange } }) {
    let curUser
    let userData
    
    try {
      curUser = cache.readQuery({ query: CURRENT_USER });
    } catch (err) {
      return
    }

    if (curUser) {
      try {
        userData = cache.readQuery({ query: FETCH_USER, variables: { _id: curUser.CurrentUserID } })
      } catch (err) {
        return
      }
    }
    if (userData) {
      userData = userData.user
      userData.participated_exchanges = userData.participated_exchanges.filter((exchange) => exchange._id != oldExchange._id)
      userData.hosted_exchanges = userData.hosted_exchanges.filter((exchange) => exchange._id != oldExchange._id )
      userData = merge({}, userData)
      cache.writeQuery({
        query: FETCH_USER,
        variables: { _id: curUser.CurrentUserID },
        data: { user: userData }
      })
    }
  }

  render(){
    
    return (
      <Query query={FETCH_EXCHANGE} 
      
      variables={{ _id: this.props.match.params.id}} > 
      
       {({ loading, error, data, refetch }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        
        let santaRead;
          
          if (data.exchange.santa_assigned){
            santaRead = <div> Elephants have been assigned </div>
          } else {
            santaRead = <div> <div>Elephant isn't ready yet!</div><div>Gifties have not been assigned </div></div>
          }
        if (this.props.user._id === data.exchange.host._id){

        return(
          <div className="ExchangeShow">

            <div className="ExchangeShowBody">
              <div className="ExchangeShowHeader">
                <p>Themed elephant goes here!</p>
                <h1>Welcome to the {data.exchange.name} Exchange!</h1>
              </div>
              <ExchangeUsers
                participants={data.exchange.participants}
                host_id={data.exchange.host._id}
                exchange_id={data.exchange._id}
                fireRefetch={refetch}
              />
            </div>
          
            <div className="ExchangeShowSidebar">
              <h2>Host: {data.exchange.host.name}</h2>
              {santaRead}
              <div className="ExchangeMembersInviteButton">
                <button onClick={() => this.setState({ modal: true, type: "search_user" })} className='exchangeButton'>Invite Users!</button>
              </div>
              <Modal closeModal={this.closeModal} type={this.state.type} exchange_id={data.exchange._id} />
              <Mutation 
                mutation={REMOVE_EXCHANGE}
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                  this.props.history.push('/dashboard');
                }}
              >
                {(removeExchange, data2) => (
                  <i className="fas fa-trash-alt remove-exchange" onClick={e => {
                    e.preventDefault();
                    removeExchange({
                      variables: { exchange_id: data.exchange._id }
                    })
                  }}></i>
                )}
              </Mutation>
            </div>
          
            {/* <LetsSurprise/> */}
              
            {/* <Errors /> */}

          </div>
        )
        } else if (some(data.exchange.participants, ['_id', this.props.user._id])) {
          return (
            <div className="ExchangeShow">
              <div className="ExchangeShowBodyNotHost">
                <div className="ExchangeShowHeader">
                  <p>Themed elephant goes here!</p>
                  <h1>Welcome to the {data.exchange.name} Exchange!</h1>
                </div>
                <ExchangeUsers
                  participants={data.exchange.participants}
                  host_id={null}
                  exchange_id={data.exchange._id}
                  fireRefetch={refetch}
                />
              </div>
              <div className="ExchangeShowSidebar">
                <h2> Host: {data.exchange.host.name} </h2>
                {santaRead}
              </div>
              {/* <LetsSurprise/> */}
              {/* <Errors /> */}
            </div>
          )
        } else {

          return(
            <div className="ExchangeShow">
 
              <div className="ExchangeShowBodyNotHost">
                <div className="ExchangeShowHeader">
                  <p>Themed elephant goes here!</p>
                  <h1>Welcome to the {data.exchange.name} Exchange!</h1>
                </div>
                <ExchangeUsers
                  participants={data.exchange.participants}
                  host_id={null}
                  exchange_id={data.exchange._id}
                  fireRefetch={null}
                />
              </div>
              <div className="ExchangeShowSidebar">
                <h2> Host: {data.exchange.host.name} </h2>
                {santaRead}
              </div>
              {/* <LetsSurprise/> */}
              {/* <Errors /> */}
            </div>
          )
        }
      }}
    </Query>)
  }
}
  
  export default withRouter(ExchangeShow);