import React, { Component } from "react";
import "./exchange_users.css";
import MemberOption from "./member_option/member_option";


class ExchangeUsers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h3 className="ExchangeMembersHeader"> Members of the Exchange </h3>
        <div className="participants-list" >
          {this.props.participants.map(participant => {
            return <MemberOption 
              participant={participant} 
              host_id={this.props.host_id} 
              exchange_id={this.props.exchange_id} 
              key={participant._id}
              fireRefetch={this.props.fireRefetch}
            />
          })}
        </div>
      </div>
    )
  }
}

export default ExchangeUsers;