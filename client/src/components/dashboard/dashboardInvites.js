import React, { Component } from "react";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import {Mutation} from "react-apollo";
const {ACCEPT_INVITE} = Mutations;
const {DELETE_INVITE} = Mutations;
const {FETCH_USER} = Queries;


class DashboardInvites extends Component{
  constructor(props){
    super(props);
    this.state ={
      invites: this.props.user.pending_invites
    }
  }

  render(){
    // let count = 0

    console.log(this.props.user.pending_invites)

    if (this.state.invites.length > 0){
      console.log(this.state.invites)
      return(

        <ul>
          {this.state.invites.map(invite => {
            // count++;
            return(
            <li key={invite._id}>
                {invite.name}
              <p>Accept this Invite?</p>

             <Mutation 
              mutation={ACCEPT_INVITE}
                  refetchQueries={() => {
                    return [
                      {
                        query: FETCH_USER,
                        variables: { _id: this.props.user._id }
                      }
                    ];
                  }}

             >
                {(addParticipant, data) => (
                  <button onClick={e=>{
                    e.preventDefault();
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
                      variables: { exchange_id: invite._id, user_id: this.props.user._id }
                      
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