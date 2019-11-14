import React, { Component } from 'react';
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
import MemberOptionMenu from "./member_option_menu";
const { FETCH_USER } = Queries;

class MemberOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: ""
    }

    this.openMemberOption = this.openMemberOption.bind(this);
    this.closeMemberOption = this.closeMemberOption.bind(this);
  }

  openMemberOption() {
    this.setState({ component: <MemberOptionMenu
      closeMemberOption={this.closeMemberOption}
      exchange_id={this.props.exchange_id}
      user_id={this.props.participant._id}
    /> });
  }

  closeMemberOption() {
    this.setState({ component: "" });
  }

  render() {
    return (<Query query={FETCH_USER} variables={{ _id: this.props.participant._id }}>

      {({ loading, error, data }) => {

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        if (this.props.host_id) {

          return (
            <div>
              <p onClick={this.openMemberOption}>{data.user.name}</p>
              {this.state.component}
            </div>
          );
        } else {
          return <p>{data.user.name}</p>
        }
      }}
    </Query>)
  }
}

export default MemberOption;