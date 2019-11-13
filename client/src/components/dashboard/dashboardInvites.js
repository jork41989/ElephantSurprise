import React, { Component } from "react";
import Mutations from "../../graphql/mutations";
import {Mutation} from "react-apollo";
const {ADD_PARTICIPANT} = Mutations;
const {DELETE_INVITE} = Mutations;


class DashboardInvites extends Component{
  constructor(props){
    super(props);
    this.state ={
      invites: this.props.user.pendingInvites || null
    }
    this.acceptInvite = this.acceptInvite.bind(this);
    this.rejectInvite = this.rejectInvite.bind(this);
  }

  acceptInvite(e, exchangeId){
    e.preventDefault();
    return (e) => (

      <Mutation mutation={ADD_PARTICIPANT}>
        {(addParticipant, data) => (
          
          addParticipant({
            variables: {exchangeId: exchangeId, userId: this.props.user._id }
          })

        )}
      </Mutation>
    )

  }

  rejectInvite(e, exchangeId){
    // e.preventDefault();
    return (e) => (

      <Mutation mutation={DELETE_INVITE}>
        {(deleteInvite, data) => (

          deleteInvite({
            variables: { exchangeId: exchangeId }
          })

        )}
      </Mutation>
    )

  }


  render(){
    let count = 0

    console.log(this.props.user.pendingInvites)

    if (this.state.invites){
      console.log(this.state.invites)
      return(

        <ul>
          {this.state.invites.map(invite => {
            return(
            <li key={invite._id + count}>
                {invite.name}
              <p>Accept this Invite?</p>

              {/* <Mutation mutation={ADD_PARTICIPANT}>

                {(addParticipant, data) => {
                  <button 
                    onClick={e => { 
                    e.preventDefault();
                    addParticipant({
                      variables: {exchangeId: invite._id, userId: this.props.user._id }
                    });
                  }}>Yes</button>
                }}

              </Mutation> */}
                      
                          
              {/* <button onClick={this.rejectInvite(invite._id)}>No</button> */}
              </li>)
            count ++;
          })}
        </ul>

      ) 
    }
    else{

      return(

        
      <p>Invites not here</p>
      
      )
    }
  }
}

export default DashboardInvites;