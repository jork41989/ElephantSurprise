import React, { Component } from "react";
import MemberOption from "./member_option/member_option";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import "./exchange_users.css";
const { FETCH_USER } = Queries;


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
              key={participant._id} 
              participant={participant} 
              host_id={this.props.host_id}
              current_user={this.props.current_user} 
              exchange={this.props.exchange}
              fireRefetch={this.props.fireRefetch}
            />
          })}
        </div>
      </div>
    )
  }
}

export default ExchangeUsers;