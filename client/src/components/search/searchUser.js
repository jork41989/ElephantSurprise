import React from 'react';
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { pull, uniqBy } from "lodash";
import elephant from '../../images/logo-v1.png'
import './searchUser.css';
const { SEARCH_USER } = Queries;
const { INVITE_USER } = Mutations;

class SearchUser extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      key_word: undefined,
      search_input: "",
      invite_list: [],
      message: ""
    };

    this.clearList = this.clearList.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  update() {
    return e => {
      if (e.target.value) {
        this.setState({ key_word: e.target.value, search_input: e.target.value });
      } else {
        this.setState({ key_word: undefined, search_input: "" });
      }
    };
  }

  clearList() {
    this.setState({
      key_word: undefined,
      search_input: "",
      invite_list: [] 
    });
  }

  addToList(user) {
    const list = this.state.invite_list;
    if (!this.state.invite_list.includes(user)){
    list.push(user);
    this.setState({ invite_list: list });
    document.getElementById(user._id).style.display = "block";
    }
  }
  
  removeFromList(user, e) {
    e.stopPropagation();
    const list = this.state.invite_list
    pull(list, user);
    this.setState({ invite_list: list });
    document.getElementById(user._id).style.display = "none";
  }

  listDiv(){
   return(
     this.state.invite_list.map(user =>{
       return (
       <div key={user._id}>{user.name}</div>
       )
     })
   )
  }

  sendInvite(e, addInvite) {
    e.preventDefault();
    if (this.state.invite_list.length > 0) {
      const unique_list = uniqBy(this.state.invite_list, "_id")
      const users = [];
      unique_list.forEach(
        user => {
          const event_ids = [];
          if (user.participated_exchanges.length > 0) {
            user.participated_exchanges.forEach(
              exchange => { event_ids.push(exchange._id); }
            );
          }

          if (user.pending_invites.length > 0) {
            user.pending_invites.forEach(
              exchange => { event_ids.push(exchange._id); }
            );
          }
          
          if (!event_ids.includes(this.props.exchange_id)) {
            users.push(user._id);
          }
        }
      );
      addInvite({
        variables: {
          exchange_id: this.props.exchange_id,
          user_ids: users
        }
      });
    }
  }

  render() {
    return (
      
      <div className="search-user-main">
        <img src={elephant} className="elenav" />
        
        <input
          type="search"
          placeholder="Search User by Name or Email"
          onChange={this.update()}
          value={this.state.search_input}
        />
        <div>
        {this.state.key_word && 
        <Query query={SEARCH_USER} variables={{ key_word: this.state.key_word }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`
            if (data && data.searchUser.length > 0) {
              const user_lis = data.searchUser.map(
                user => { return (
                  <li key={user._id} onClick={() => { this.addToList(user) }}>
                    <div id="user-item">
                      {user.name}
                    </div>
                    <i className="fas fa-check-circle" onClick={(e) => { this.removeFromList(user, e) }} id={user._id} />
                  </li>
                );}
              );
                
              return (
                <div className="search-list">
                <ul>
                  {user_lis}
                </ul>
                </div>
                
              );
            } else if (data && data.searchUser.length === 0) {
              return "No User Found.";
            }
          }}
        </Query>
        }
        </div>
        <div className="searchUserlist">
          {this.listDiv()}
        </div>
        <p>{this.state.message}</p>
        <div>
          <Mutation
            mutation={INVITE_USER}
            onError={err => this.setState({ message: err.message })}
            onCompleted={data => {
              this.setState({
                message: "Invitations Sent!"
              });
              this.clearList();
            }}
          >
            {(addInvite, { data }) => (
              
              <button onClick={e => this.sendInvite(e, addInvite)} className="searchButton">Send Invitations!</button>
              
            )}
          </Mutation>
        <button onClick={this.clearList} className="searchButton">Clear Selected</button>
        </div>
        <button onClick={() => { this.props.closeModal() }} className="search-user-main-submit">x</button>
      </div>
    );
  }
}

export default SearchUser;