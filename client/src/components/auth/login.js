import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../../graphql/mutations'
import ReactTooltip from 'react-tooltip'
const { LOGIN_USER } = Mutations;


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: null
    };
    this.errorTips = this.errorTips.bind(this)
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  updateCache(client, {data}) {
      
      // here we can write directly to our cache with our returned mutation data
      client.writeData({
        data: {
          isLoggedIn: data.login.loggedIn, 
          CurrentUserName: data.login.name,
          CurrentUserID: data.login._id
        }
      });
    }


  errorTips(){
    if(this.state.errors){
      if (this.state.errors[0].message === "Email is invalid"){
        return (
          <ReactTooltip id="email" place="top" type="error" effect="solid">
            <span>{this.state.errors[0].message}</span>
          </ReactTooltip>
        )
      } else if (this.state.errors[0].message === "Password field is required"){
        return (
          <ReactTooltip id="password" place="top" type="error" effect="solid">
            <span>{this.state.errors[0].message}</span>
          </ReactTooltip>
        )
      } else if (this.state.errors[0].message === "There is no account associated with this email") {
        return (
          <ReactTooltip id="email" place="top" type="error" effect="solid">
            <span>{this.state.errors[0].message}</span>
          </ReactTooltip>
        )
      }
  }
}


render() {
    return (
       <Mutation
            mutation={LOGIN_USER}
        onError={err => this.setState({ errors: err.graphQLErrors})}

            onCompleted={data => {
                const { token, _id, name } = data.login;
                localStorage.setItem('auth-token', token);
                localStorage.setItem('currentUserID', _id );
                localStorage.setItem('currentUserName', name)
                this.props.closeModal();
            }}
            update={(client, data) => this.updateCache(client, data)}
        >
        {loginUser => (
          <div className="signupModal">
            <form className="signupForm"
              onSubmit={e => {
                e.preventDefault();
                this.setState({errors: null})
                loginUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <img src="https://img.icons8.com/carbon-copy/100/000000/elephant.png" className="elenav" /><h1>Elephant Surprise</h1>
              {this.errorTips()}
              <input
                className="Authinput"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
                id={'email'}
                data-tip data-for={'email'}
              />
              <input
                className="Authinput"
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
                id={'password'}
                data-tip data-for={'password'}
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