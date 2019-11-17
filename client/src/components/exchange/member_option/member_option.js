import React, { Component } from 'react';
import MemberOptionMenu from "./member_option_menu";
import RemoveMember from "./remove_member";
import "./member_option.css";
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
const { FETCH_WISH_LIST } = Queries;


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
      exchange={this.props.exchange}
      user_id={this.props.participant._id}
      host_id={this.props.host_id}
    /> });
  }

  openRemoveMemberOption(e, wish_list_id) {
    e.stopPropagation();
    this.setState({
      component: <RemoveMember
        closeMemberOption={this.closeMemberOption}
        exchange={this.props.exchange}
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
    return (
      <Query 
        query={FETCH_WISH_LIST} 
        variables={{ exchange_id: this.props.exchange._id, user_id: this.props.participant._id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) console.log(error);

          if (data.fetch_wish_list.santa && this.props.current_user._id === data.fetch_wish_list.santa._id ) {
            return (
              <div className="member-option-main">
                <p>{this.props.participant.name}</p>
                {this.state.component}
                <i className="fas fa-gift optionsMenu" onClick={this.openMemberOption}></i>
              </div>
            );
          } else if (this.props.current_user._id === this.props.participant._id) {
            return (
              <div className="member-option-main">
                <p>{this.props.participant.name}</p>
                {this.state.component}
                <i className="fas fa-bars optionsMenu" onClick={this.openMemberOption}></i>
              </div>
            );
          } else if (this.props.current_user._id === this.props.host_id) {
            return (
              <div className="member-option-main">
                <p>{this.props.participant.name}</p>
                {this.state.component}
                <i className="fas fa-bars optionsMenu" onClick={this.openMemberOption}></i>
              </div>
            ); 
          } else {
            return (
              <div className="member-option-main">
                <p>{this.props.participant.name}</p>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default MemberOption;