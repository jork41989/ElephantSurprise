  import React, { Component } from "react";
  import Queries from "../../graphql/queries";
  



  const ExchangeShow = (props)=> {

    (props.user === props.exchange.host_id) ?

    return(

      <h1>
        Welcome to Your Exchange!
      </h1>

      <h2> Host {props.user.name} </h2>

      // <LetsSurprise/>
      // <InviteUser/>
      // <ExchangeUsers />
      // <Errors />

    ) :

    return(

      <h2> Welcome to {props.host_id.name} Exchange, Gifter {props.user.name}! </h2>

    )

  }