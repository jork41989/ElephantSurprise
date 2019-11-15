import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import ReactTooltip from 'react-tooltip'
const { INVITE_USER } = Mutations;


class InviteUser extends Component{
  constructor(props){
    super(props)

    this.state={
      email: "",
      editing: false,
      errors: null
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.errorTips = this.errorTips.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }



  errorTips() {
    if (this.state.errors) {  
    return (
      <ReactTooltip id="email" place="top" type="error" effect="solid">
        <span>{this.state.errors[0].message}</span>
      </ReactTooltip>
    )
      
    }
  }


  render() {

    // if (this.state.editing) {
      return(
        <div>
          <button onClick={this.handleEdit}
            value={this.state.editing ? "Hide Invitation Form" : "Click to send an Invitation" }
          >Invite Member</button>
      
          <Mutation mutation={ INVITE_USER }>
            {(addInvite, data)=>(
              
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.setState({errors: null})
                    addInvite({
                      variables: { exchangeId: this.props._id, email: this.state.email }
                    }).then(() => this.setState({ editing: false }));
                  }}
                >
                  {this.errorTips()}
                  <input
                    value={this.state.email}
                    onChange={this.fieldUpdate("email")}
                    id={'email'}
                    data-tip data-for={'email'}
                  />
                  <button type="submit">Send Invite!</button>
                </form>
              </div>
            )}
          </Mutation>
        </div>
      )
    }
  // }
}

export default InviteUser;