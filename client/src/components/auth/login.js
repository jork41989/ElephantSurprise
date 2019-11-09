import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../../graphql/mutations'
const { LOGIN_USER } = Mutations;


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        data: { isLoggedIn: data.login.loggedIn }
      });
    }

render() {
    return (
       <Mutation
            mutation={LOGIN_USER}
            onCompleted={data => {
                const { token } = data.login;
                localStorage.setItem('auth-token', token);
                this.props.closeModal();
            }}
            update={(client, data) => this.updateCache(client, data)}
        >
        {loginUser => (
          <div className="signupModal">
            <form className="signupForm"
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <img src="https://img.icons8.com/carbon-copy/100/000000/elephant.png" className="elenav" /><h1>Elephant Surprise</h1>
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
              <button type="submit" className="authButton">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
}
}

export default Login;