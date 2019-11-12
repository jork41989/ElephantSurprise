import React, { Component } from "react";
import { Link} from "react-router-dom";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
import './dashboard.css'
const { CURRENT_USER, FETCH_USER } = Queries;

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render (){
    return(
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
          
          return(
          <Query query={FETCH_USER}
            variables={{_id: data.CurrentUserID}}
          >
            {({ loading, error, data }) => {
              if (loading)
                return "Loading...";
              if (error)
                return `Error! ${error.message}`;
              console.log(data)
              return (
                <div>
                  <h2 className="dashboardGreeting">Hello {data.user.name}</h2>
                  <div className="dashboardExchangeDiv">
                    <h3>Exchanges</h3>
                    <Link to="/newExchange"> Create a New Exchange</Link>
                  </div>
                </div>

                  )
                }
              
              }
          </Query>
          )
       
         
         }}
    </Query>)}


  
}

export default Dashboard;