import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
const { FETCH_USER } = Queries;

const ExchangeUsers = (participants) => {

  return(

    <ul className="participants-list" >
      {participants.map( participant => { 

        return (<Query query={FETCH_USER} variables={{ _id: participant.id }}>

          {({loading, error, data})=> {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return <h3 key={data.id}>{data.name}</h3>;
          }}   
        </Query>)

      })}
    </ul>
  )

}

export default ExchangeUsers;