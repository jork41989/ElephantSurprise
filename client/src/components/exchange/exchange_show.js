  import React, {Component} from "react";
  import {withRouter} from "react-router-dom";
  import { Query } from "react-apollo";
  import Queries from "../../graphql/queries";
  import ExchangeUsers from "./exchange_users";
  import InviteUser from "./invite_user";
  import './exchange_show.css'
  const { FETCH_EXCHANGE } = Queries;

class ExchangeShow extends Component {

  constructor(props){
    super(props);


  }

  render(){
    console.log(this.props.user)
    return (
      <Query query={FETCH_EXCHANGE} 
      // variables={{ _id: this.props.user.hosted_exchanges[0]._id }} > 
      variables={{ _id: this.props.match.params.id}} > 
      
       {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        console.log("exchange host id", data.exchange.host)
        console.log("exchange data", data.exchange)
        console.log("user id", this.props.user._id)
        let hosted;
          if (data.exchange.santa_assigned){
            hosted = <div> Elephants have been assigned </div>
          } else {
            hosted = <div> Elephant isn't ready yet! </div>
          }
        if (this.props.user._id === data.exchange.host._id){
          console.log(data.exchange.participants) 
        return(
          <div className="ExchangeShow">

          
          <h1>
              Welcome to the {data.exchange.name} Exchange!
          </h1>

          <h2> Host {this.props.user.name} </h2>
            {hosted}
            {/* <LetsSurprise/> */}
            
            <ExchangeUsers exchange={Object.values(data.exchange.participants)}/>
            {/* <Errors /> */}

          </div>

        )
        }else{

          return(
            <div className="ExchangeShow">
              <h2> Welcome to {data.exchange.name} Exchange, Gifter {this.props.user.name}! </h2>
            </div>
          )

          }
      }}
    </Query>)

  }

}
  
  export default withRouter(ExchangeShow);