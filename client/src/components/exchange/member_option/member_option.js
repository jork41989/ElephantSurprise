import React, { Component } from 'react';
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
import MemberOptionMenu from "./member_option_menu";
import RemoveMember from "./remove_member";
const { FETCH_USER } = Queries;

class MemberOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: ""
    }

    this.openMemberOption = this.openMemberOption.bind(this);
    this.closeMemberOption = this.closeMemberOption.bind(this);
    this.openRemoveMemberOption = this.openRemoveMemberOption.bind(this);
  }

  openMemberOption() {
    this.setState({ component: <MemberOptionMenu
      closeMemberOption={this.closeMemberOption}
      openRemoveMemberOption={this.openRemoveMemberOption}
      exchange_id={this.props.exchange_id}
      user_id={this.props.participant._id}
      host_id={this.props.host_id}
    /> });
  }

  openRemoveMemberOption(wish_list_id) {
    this.setState({
      component: <RemoveMember
        closeMemberOption={this.closeMemberOption}
        exchange_id={this.props.exchange_id}
        user={this.props.participant}
        wish_list_id={wish_list_id}
        fireRefetch={this.props.fireRefetch}
      />
    });
  }

  closeMemberOption() {
    this.setState({ component: "" });
  }

  render() {
    return (<Query query={FETCH_USER} variables={{ _id: this.props.participant._id }}>

      {({ loading, error, data }) => {

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        if (this.props.fireRefetch) {
          return (
            <div>
              <p onClick={this.openMemberOption}>{data.user.name}</p>
              {this.state.component}
            </div>
          );
        } else {
          return (
            <div>
              <p>{data.user.name}</p>
            </div>
          );
        }
        
        
      }}
    </Query>)
  }
}

export default MemberOption;