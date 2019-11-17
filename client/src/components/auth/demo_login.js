import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../../graphql/mutations';
const { LOGIN_USER } = Mutations;

class DemoLogin extends Component {
  constructor(props) {
    super(props);
  }

  updateCache(client, { data }) {
    client.writeData({
      data: {
        isLoggedIn: data.login.loggedIn,
        CurrentUserName: data.login.name,
        CurrentUserID: data.login._id
      }
    });
  }

  loginDemo(e, loginUser) {
    e.preventDefault();
    loginUser({
      variables: {
        email: "demouser@demo.com",
        password: "demo6o3AX0DY41"
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={err => console.log(err)}
        onCompleted={data => {
          const { token, _id, name } = data.login;
          localStorage.setItem('auth-token', token);
          localStorage.setItem('currentUserID', _id);
          localStorage.setItem('currentUserName', name)
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <button className="demo-button" onClick={e => { this.loginDemo(e, loginUser)}}>
            Demo Login
          </button>
        )}
      </Mutation>
    );
  }
}

export default DemoLogin;