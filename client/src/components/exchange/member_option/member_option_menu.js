import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
import { Link } from "react-router-dom";
const { FETCH_WISH_LIST } = Queries;

class MemberOptionMenu extends Component {
  constructor(props) {
    super(props);
  }

  handleClickOutside = evt => {
    this.props.closeMemberOption();
  };

  render() {
    return (
      <Query query={FETCH_WISH_LIST} variables={{ exchange_id: this.props.exchange_id, user_id: this.props.user_id}}>

    {({ loading, error, data }) => {

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      console.log(data);
      return (
        <div>
          <Link to={`/wish_lists/${data.fetch_wish_list._id}`}>
            <button>See Wish List</button>
          </Link>
          <button>Remove Member</button>
        </div>
      );
    }}
      </Query>
    );
  }
}

export default onClickOutside(MemberOptionMenu);