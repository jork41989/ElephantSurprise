import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../../graphql/mutations';
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
                  this.props.history.push('/');
              }}
              update={(client, data) => this.updateCache(client, data)}
          >
          {signupUser => (
            <div>
              <form
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
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
                />
                <input
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
                <input
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
                <button type="submit">Register</button>
              </form>
            </div>
          )}
        </Mutation>
      );
  }
}

export default Signup;