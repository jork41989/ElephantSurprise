import React, { Component } from "react";
import { Link } from "react-router-dom";
import elephant from '../../images/logo-v1.png'
import elephantChristmas from '../../images/logo-v1-christmas.png'
import elephantChannukah from '../../images/logo-v1-channukah.png'
import elephantOffice from '../../images/logo-v1-office.png'
import channukahBG from '../../images/chanukah.jpg'
import officeBG from '../../images/officeHoliday.jpg'
import christmasBG from '../../images/xmasBG.jpg'
import otherBG from '../../images/Other.jpg'
const ELEPHANT_ICONS = { office: elephantOffice, christmas: elephantChristmas, hanukkah: elephantChannukah }
const THEME_BG = { office: officeBG, christmas: christmasBG, hanukkah: channukahBG }
class DashboardExchanges extends Component {
  constructor(props) {
    super(props);
    this.renderExchanges = this.renderExchanges.bind(this)
  }

  elephantRender(theme){
     if (theme && ELEPHANT_ICONS[theme]) {
      return (
        <img src={ELEPHANT_ICONS[theme]} className="dashElephant"  />
      )

    } else {
      return (
        <img src={elephant} className="dashElephant" />
      )
    }
  }
  
  createExhangeDiv(exchange){
    if (this.props.hosted.includes(exchange._id)) {
      let bg;
      if (exchange.type && THEME_BG[exchange.type]){
      bg = {backgroundImage: `url('${THEME_BG[exchange.type]}')`}
      } else {
        bg = { backgroundImage: `url('${otherBG}')` }
      }
      console.log(exchange.type)
      return (
        <Link to={`/exchanges/${exchange._id}`}className="ExchangeListItemDiv" style={bg} >
          <div>
            {this.elephantRender(exchange.type)}
          </div>
          <div className="exchangeItemInfoDiv">
            <p className="ExchangeLink">{exchange.name}</p>
            <i className="fas fa-gift"></i>
          </div>
        </Link>

      )
    } else {
      let bg;
      if (exchange.type && THEME_BG[exchange.type]) {
        bg = { backgroundImage: `url('${THEME_BG[exchange.type]}')` }
      } else {
        bg = { backgroundImage: `url('${otherBG}')` }
      }
      console.log(bg)
      return (
        
        <Link to={`/exchanges/${exchange._id}`} key={exchange._id} className="ExchangeListItemDiv" style={bg}>
          <p className="ExchangeLink">{exchange.name}</p>
        </Link>)
    }
  }
  renderExchanges(){
    
    if(this.props.exchanges){
      return(<div className="ExchangesLinks">
      {this.props.exchanges.map(exchange =>{

        return this.createExhangeDiv(exchange) 
       
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