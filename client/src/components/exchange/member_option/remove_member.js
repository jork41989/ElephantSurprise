import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { REMOVE_MEMBER } = Mutations

class RemoveMember extends Component {
  constructor(props) {
    super(props);
  }

  handleRemove(e, removeMember) {
    e.stopPropagation();
    removeMember({
      variables: {
        wish_list_id: this.props.wish_list_id,
        user_id: this.props.user._id,
        exchange_id: this.props.exchange_id
      }
    });
  }

  render() {
    return (
      <div onClick={() => { this.props.closeMemberOption() }} className="member-menu-overlay">
        <div className="remove-member-main">
          <div>Remove</div>
          <div>{this.props.user.name}</div> 
          <div>from Exchange?</div>
          <div>
            <Mutation
              mutation={REMOVE_MEMBER}
              onError={err => console.log(err.message)}
              onCompleted={data => {
                this.props.closeMemberOption();
                this.props.fireRefetch();
              }}
            >
              {(removeMember) => (
                <button onClick={e => this.handleRemove(e, removeMember)}>Yes</button>
              )}
            </Mutation>
            <button onClick={this.props.closeMemberOption} >No</button>
          </div>
          <i className="far fa-times-circle" onClick={this.props.closeMemberOption} />
        </div>
      </div>
    );
  }
}

export default RemoveMember;