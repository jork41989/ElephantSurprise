import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";
import { Link } from "react-router-dom";
const { FETCH_WISH_LIST } = Queries;

class MemberOptionMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={FETCH_WISH_LIST} variables={{ exchange_id: this.props.exchange_id, user_id: this.props.user_id}}>

    {({ loading, error, data }) => {

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      if (this.props.host_id && this.props.host_id !== this.props.user_id) {
        return (
          <div>
            <div>
              <Link to={`/wish_lists/${data.fetch_wish_list._id}`}>
                <button>See Wish List</button>
              </Link>
              <button onClick={() => {this.props.openRemoveMemberOption(data.fetch_wish_list._id)}}>Remove Member</button>
            </div>
            <i className="far fa-times-circle" onClick={this.props.closeMemberOption}/>
          </div>
        ) 
      } else {
        return (
          <div>
            <div>
              <Link to={`/wish_lists/${data.fetch_wish_list._id}`}>
                <button>See Wish List</button>
              </Link>
            </div>
            <i className="far fa-times-circle" onClick={this.props.closeMemberOption} />
          </div>
        ) 
      }
    }}
      </Query>
    );
  }
}

export default MemberOptionMenu;