import React, { Component } from "react";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import {Mutation} from "react-apollo";
import './dashboard.css'
const {ACCEPT_INVITE_A} = Mutations;
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


    if (this.state.invites.length > 0){
      return(

        <div >
          {this.state.invites.map(invite => {
            // count++;
            return(
              <div key={invite._id} className="invitationDiv">
                {invite.name}
              <p>Join this exchange?</p>
                
              <div>
             <Mutation 
              mutation={ACCEPT_INVITE_A}
                  refetchQueries={() => {
                    return [
                      {
                        query: FETCH_USER,
                        variables: { _id: this.props.user._id }
                      }
                    ];
                  }}

             >
                  {(acceptAndUpdate, data) => (
                    <i className="fas fa-smile -green"
                      onClick={e => {
                        e.preventDefault();
                        acceptAndUpdate({
                          variables: { exchange_id: invite._id, user_id: this.props.user._id }
                        })
                          .then(data => {

                            this.setState({ invites: data.data.mutation2.pending_invites })
                          })
                      }}
                    ></i>
                 
                )}
              </Mutation>

              <Mutation mutation={DELETE_INVITE}>
                  {(deleteInvite, data) => (
                    <i className="fas fa-meh -purple"
                      onClick={e => {
                        e.preventDefault();

                        

                        deleteInvite({
                          variables: { exchange_id: invite._id, user_id: this.props.user._id }

                        }).then(data => {
                          
                          this.setState({ invites: data.data.deleteInvite.pending_invites })
                        })
                      }}
                    > </i>
                 
                )}
              </Mutation>
                </div>

              </div>)
            
          })}
        </div>

      ) 
    }
    else{

      return(

        
        <p>No pending invites</p>
      
      )
    }
  }
}

export default DashboardInvites;