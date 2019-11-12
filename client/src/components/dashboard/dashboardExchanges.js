import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashboardExchanges extends Component {
  constructor(props) {
    super(props);
    this.renderExchanges = this.renderExchanges.bind(this)
  }

  renderExchanges(){
    
    if(this.props.exchanges){
      return(<div className="ExchangesLinks">
      {this.props.exchanges.map(exchange =>( <Link to={`/exchanges/${exchange._id}`}>{exchange.name}</Link> ))}
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