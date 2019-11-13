import React, { Component } from "react";
import Mutations from "../../graphql/mutations";
import {Mutation} from "react-apollo";
const {ADD_PARTICIPANT} = Mutations;
const {DELETE_INVITE} = Mutations;


class DashboardInvites extends Component{
  constructor(props){
    super(props);
    this.state ={
      invites: this.props.user.pending_invites
    }
  }


  render(){
    let count = 0

    console.log(this.props.user.pending_invites)

    if (this.state.invites.length > 0){
      console.log(this.state.invites)
      return(

        <ul>
          {this.state.invites.map(invite => {
            return(
            <li key={invite._id + count}>
                {invite.name}
              <p>Accept this Invite?</p>

             <Mutation mutation={ADD_PARTICIPANT}>
                {(addParticipant, data) => (
                  <button onClick={e=>{
                    e.preventDefault();
                      console.log("invite", invite._id);
                    addParticipant({
                      variables: { exchange_id: invite._id, user_id: this.props.user._id }
                    });
                  }}>
                  Yes
                  </button>
                )}
              </Mutation>

              <Mutation mutation={DELETE_INVITE}>
                  {(deleteInvite, data) => (
                   
                  <button onClick={e => {
                    e.preventDefault();

                      console.log("invite", invite._id);

                      deleteInvite({
                      variables: { exchangeId: invite._id, userId: this.props.user._id }
                      
                      }).then(data => {
                        console.log(data);
                        this.setState({invites: data.data.deleteInvite.pending_invites })
                      })
            }}>
              No
                </button>
                )}
              </Mutation>


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