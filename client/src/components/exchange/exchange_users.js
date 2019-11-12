import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
const { FETCH_USER } = Queries;

const ExchangeUsers = (exchange) => {

  return(
    <div>
      <h3 className="ExchangeMembersHeader"> Members of the Exchange </h3>
      <div className="ExchangeMembersInviteButton"><button>Invite Users!</button></div>
      <div className="participants-list" >
        {exchange.exchange.map(participant => { 

          return (<Query query={FETCH_USER} variables={{ _id: participant._id }}>

            {({loading, error, data})=> {
              console.log("member data", data)

              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return <p key={data.user._id}>{data.user.name}</p>;
            }}   
          </Query>)

        })}
      </div>

    </div>
  )

}

export default ExchangeUsers;