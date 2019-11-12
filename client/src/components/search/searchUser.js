import React from 'react';
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
const { SEARCH_USER } = Queries;

class SearchUser extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      key_word: undefined,
      search_input: ""
    };

    this.clearList = this.clearList.bind(this);
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
    this.setState({ key_word: undefined, search_input: "" });
  }

  render() {
    return (
      
      <div>
        <input
          type="search"
          placeholder="Search User by Name or Email"
          onChange={this.update()}
          value={this.state.search_input}
        />
        
        {this.state.key_word && 
        <Query query={SEARCH_USER} variables={{ key_word: this.state.key_word }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            
            if (data && data.searchUser.length > 0) {
              const user_lis = data.searchUser.map(
                user => { return (
                  <li key={user._id}>
                    <div>{user.name}</div>
                    <div>Email: {user.email}</div>
                  </li>
                );}
              );
              
              return (
                <div>
                  <div onClick={this.clearList}>X</div>
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
      
    );
  }
}

export default SearchUser;