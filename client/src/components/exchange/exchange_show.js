  import React, {Component} from "react";
  import {withRouter} from "react-router-dom";
  import { Query, Mutation} from "react-apollo";
  import Queries from "../../graphql/queries";
  import ExchangeUsers from "./exchange_users";
  import Mutations from "../../graphql/mutations";
  import InviteUser from "./invite_user";
  import './exchange_show.css'
  import Modal from '../modal/modal';
  const { REMOVE_EXCHANGE } = Mutations
  const { FETCH_EXCHANGE } = Queries;

class ExchangeShow extends Component {

  constructor(props){
    super(props);

    this.state = {
      modal: false,
      type: ""
    }

    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState({ modal: false, type: false })
  }

  render(){
    // console.log(this.props.user)
    return (
      <Query query={FETCH_EXCHANGE} 
      // variables={{ _id: this.props.user.hosted_exchanges[0]._id }} > 
      variables={{ _id: this.props.match.params.id}} > 
      
       {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        // console.log("exchange host id", data.exchange.host)
        // console.log("exchange data", data.exchange)
        // console.log("user id", this.props.user._id)
        let santaRead;
        
          if (data.exchange.santa_assigned){
            santaRead = <div> Elephants have been assigned </div>
          } else {
            santaRead = <div> <div>Elephant isn't ready yet!</div><div>Gifties have not been assigned </div></div>
          }
        if (this.props.user._id === data.exchange.host._id){

          // console.log(data.exchange.participants) 
        return(
          <div className="ExchangeShow">

            <div className="ExchangeShowBody">
              <h1>Welcome to the {data.exchange.name} Exchange!</h1>
              <ExchangeUsers exchange={Object.values(data.exchange.participants)} />
            </div>
            
            <div className="ExchangeShowSidebar">
                <h2> Host: {this.props.user.name} </h2>
                {santaRead}
                <div className="ExchangeMembersInviteButton"><button>Invite Users!</button></div>
            </div>
          
          <div className="ExchangeShowSidebar">
              <h2> Host: {this.props.user.name} </h2>
              {santaRead}
              <div className="ExchangeMembersInviteButton">
                <button onClick={() => this.setState({ modal: true, type: "search_user" })}>Invite Users!</button>
              </div>
              <Modal closeModal={this.closeModal} type={this.state.type} exchange_id={data.exchange._id} />
              <Mutation mutation={REMOVE_EXCHANGE}>
                {(removeExchange, data2) => (
                  <button
                    onClick={ e => {
                      e.preventDefault();
                      removeExchange({
                        variables: { exchange_id: data.exchange._id  }
                      }).then(console.log("worked!"))
                    }}>
                    Kill Me
                  </button>
                )

                }
              
              </Mutation>
          </div>
          
            {/* <LetsSurprise/> */}\
              
            {/* <Errors /> */}
          
          </div>
        )
        } else {

          return(
            <div className="ExchangeShow">
              <h1> Welcome to {data.exchange.name} Exchange!, {this.props.user.name}</h1>
              <ExchangeUsers participants={Object.values(data.exchange.participants)} />
            </div>
          )

        }
      }}
    </Query>)

  }

}
  
  export default withRouter(ExchangeShow);