import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
const { CURRENT_USER } = Queries;

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render (){
    return(
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        
        if (loading)
          return "Loading...";
        if (error)
          return `Error! ${error.message}`;
        console.log(data)
        return ( 
        <div>
            <p>Hellow</p>
        </div>
         )}}
    </Query>)}
  
}

export default Dashboard;