import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
const { FETCH_USER } = Queries;
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { INVITE_USER } = Mutations;


class InviteUser extends Component{
  constructor(props){
    super(props)

    this.state={
      email: "",
      editing: false
    }

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render(){

    <button onClick={this.handleEdit}
      value={this.state.editing ? "Hide Invitation Form" : "Click to send an Invitation" }
    />
     
    if (this.state.editing){
      <Mutation mutation={ INVITE_USER }>
        {(addInvite, data)=>(
          
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                addInvite({
                  variables: { exchangeId: this.props._id, email: this.state.email }
                }).then(() => this.setState({ editing: false }));
              }}
            >
              <input
                value={this.state.email}
                onChange={this.fieldUpdate("email")}
              />
              <button type="submit">Send Invite!</button>
            </form>
          </div>
        )}
      </Mutation>
    }

  }
}