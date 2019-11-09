import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../../graphql/mutations';
import './auth.css'
const { SIGNUP_USER } = Mutations;


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  updateCache(client, {data}) {
      console.log(data);
      // here we can write directly to our cache with our returned mutation data
      client.writeData({
        data: { isLoggedIn: data.register.loggedIn }
      });
    }

  render() {
      return (
        <Mutation
              mutation={SIGNUP_USER}
              onCompleted={data => {
                  const { token } = data.register;
                  localStorage.setItem('auth-token', token);
                this.props.closeModal();
              }}
              update={(client, data) => this.updateCache(client, data)}
          >
          {signupUser => (
            <div className="signupModal">
              <form className="signupForm"
                onSubmit={e => {
                  e.preventDefault();
                  signupUser({
                    variables: {
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <input
                  className="Authinput"
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
                />
                <input
                  className="Authinput"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
                <input
                  className="Authinput"
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
                <button type="submit" className="authButton">Register</button>
              </form>
            </div>
          )}
        </Mutation>
      );
  }
}

export default Signup;