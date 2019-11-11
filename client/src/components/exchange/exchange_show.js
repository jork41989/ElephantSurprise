  import React, { Component } from "react";
  import { Query } from "react-apollo";
  import Queries from "../../graphql/queries";
  const { FETCH_EXCHANGE } = Queries;
  import ExchangeUsers from "./exchange_users";




  const ExchangeShow = (props)=> {

    <Query query={FETCH_EXCHANGE}> {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      if (props.user === data.exchange.host_id){

      return(

        <h1>
          Welcome to Your Exchange!
        </h1>

        <h2> Host {props.user.name} </h2>

        // <LetsSurprise/>
        // <InviteUser/>
        <ExchangeUsers participants={data.participants}/>
        // <Errors />

      )
     }else{

      return(

        <h2> Welcome to {props.host_id.name} Exchange, Gifter {props.user.name}! </h2>

      )

      }
      }}
    </Query>

  }