import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
import DashboardExchanges from './dashboardExchanges'
import './dashboard.css'
import DashboardInvites from "./dashboardInvites";
const { CURRENT_USER, FETCH_USER } = Queries;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      sidebar: false
    }
    this.renderHelp = this.renderHelp.bind(this)
  }
  
  renderHelp(){
    let bodyDiv = document.getElementById('dashBody')
    let sideDiv = document.getElementById('dashSidebar')
    
    if (this.state.sidebar){
      bodyDiv.style.width = "100%"
      sideDiv.classList.remove('-showSide')
      this.setState({sidebar: false})
    } else {
      bodyDiv.style.width = "75%"
      sideDiv.classList.add('-showSide')
      this.setState({ sidebar: true })
    }
  }
  render (){
    
    return(
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
          if (loading)
            return "Loading...";
          if (error)
            return `Error! first ${error.message}`;
            console.log(data.CurrentUserID)
          return(
          <Query query={FETCH_USER}
            variables={{_id: data.CurrentUserID}}
          >
            {({ loading, error, data }) => {
              if (loading)
                return "Loading...";
              if (error)
                return `Error! second ${error.message}`;
              
              let hosted = data.user.hosted_exchanges.map(exchange => (exchange._id))
              
              
              return (
                <div className="DashboardMain">
                  
                  <div className="DashboardBody" id="dashBody">
                    <h2 className="dashboardGreeting">Hello {data.user.name}</h2>
                    <div className="dashboardExchangeDiv">
                      <h3>Exchanges</h3>
                      <p> Your hosted exchanges are identified with a <i className="fas fa-gift"></i> </p>
                      <DashboardExchanges exchanges={data.user.participated_exchanges} hosted={hosted} />
                      <Link to="/newExchange"> Create a New Exchange</Link>
                      
                    </div>
                  </div>
            
                  <div onClick={this.renderHelp} className='sidebarButton'><i className="fas fa-envelope"></i></div>
                  <div className="DashboardSidebar" id="dashSidebar">
                    <h3>Pending Invites</h3>
                    <DashboardInvites user={data.user} />
                
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