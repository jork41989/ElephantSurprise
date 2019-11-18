import React, { Component } from "react";
import { Link } from "react-router-dom";
import elephant from '../../images/logo-v1.png'
import elephantChristmas from '../../images/logo-v1-christmas.png'
import elephantChannukah from '../../images/logo-v1-channukah.png'
import elephantOffice from '../../images/logo-v1-office.png'
import channukahBG from '../../images/chanukah.jpg'
const ELEPHANT_ICONS = { office: elephantOffice, christmas: elephantChristmas, channukah: elephantChannukah }

class DashboardExchanges extends Component {
  constructor(props) {
    super(props);
    this.renderExchanges = this.renderExchanges.bind(this)
  }
  createExhangeDiv(exchange){
    console.log(exchange)
  }
  renderExchanges(){
    
    if(this.props.exchanges){
      return(<div className="ExchangesLinks">
      {this.props.exchanges.map(exchange =>{
        if (this.props.hosted.includes(exchange._id))  {
          this.createExhangeDiv(exchange)
          return (
        
        <div key={exchange._id} className="ExchangeListItemDiv">
          <Link to={`/exchanges/${exchange._id}`} className="ExchangeLink">{exchange.name}</Link>
          <i className="fas fa-gift"></i>
        </div>
      )
        } else {
         return (
           <div key={exchange._id} className="ExchangeListItemDiv"> 
             <Link to={`/exchanges/${exchange._id}`} className="ExchangeLink">{exchange.name}</Link> 
          </div>)
        }
    })}
      </div>)
    }
  }
  render(){
    
  return (<div>
    {this.renderExchanges()}
    </div>
    )
  }

  
}

export default DashboardExchanges;