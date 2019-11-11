  import React from "react";
  import { Query } from "react-apollo";
  import Queries from "../../graphql/queries";
  import ExchangeUsers from "./exchange_users";
  import InviteUser from "./invite_user";
  const { FETCH_EXCHANGE } = Queries;




  const ExchangeShow = (props)=> {

    return (
    <Query query={FETCH_EXCHANGE}> {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      if (props.user === data.exchange.host_id){

      return(
        <div className={ExchangeShow}>

        
        <h1>
          Welcome to Your Exchange!
        </h1>

        <h2> Host {props.user.name} </h2>

          {/* <LetsSurprise/> */}
          <InviteUser/>
          <ExchangeUsers participants={data.participants}/>
          {/* <Errors /> */}

        </div>

      )
     }else{

      return(
        <div className={ExchangeShow}>
          <h2> Welcome to {props.host_id.name} Exchange, Gifter {props.user.name}! </h2>
        </div>
      )

      }
      }}
    </Query>)

  }
  
  export default ExchangeShow;