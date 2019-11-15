import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
const { FETCH_USER } = Queries;

const ExchangeUsers = (props) => {
  
  return(
    <div>
      <h3 className="ExchangeMembersHeader"> Members of the Exchange </h3>
      <div className="participants-list" >
        {props.participants.map((participant, i) => { 

          return (<Query key={i} query={FETCH_USER} variables={{ _id: participant._id }}>

            {({loading, error, data})=> {
              

              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return <p>{data.user.name}</p>;
            }}   
          </Query>)

        })}
      </div>

    </div>
  )

}

export default ExchangeUsers;