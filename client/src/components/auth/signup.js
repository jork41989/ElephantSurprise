import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../../graphql/mutations';
import ReactTooltip from 'react-tooltip'
import elephant from '../../images/logo-v1.png'
import './auth.css'
const { SIGNUP_USER } = Mutations;


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
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
          isLoggedIn: data.register.loggedIn, 
          CurrentUserName: data.register.name,
          CurrentUserID: data.register._id,  }
      });
    }
  errorTips() {
    let errArr = []
    if (this.state.errors) {
      if (this.state.errors.email){
        errArr.push(
        <ReactTooltip id="email" place="top" type="error" effect="solid">
          <span>{this.state.errors.email}</span>
        </ReactTooltip>
        )
      }
      if (this.state.errors.name) {
        errArr.push(
        <ReactTooltip id="name" place="top" type="error" effect="solid">
          <span>{this.state.errors.name}</span>
        </ReactTooltip>
        )
      } 
      if (this.state.errors.password) {
        errArr.push(
        <ReactTooltip id="password" place="top" type="error" effect="solid">
          <span>{this.state.errors.password}</span>
        </ReactTooltip>
        )
      }
    }
    return errArr
  }
  render() {
      return (
        <Mutation
              mutation={SIGNUP_USER}
          onError={err => this.setState({ errors: JSON.parse(err.graphQLErrors[0].message) })}
              onCompleted={data => {
                const { token, _id, name } = data.register;
                  localStorage.setItem('auth-token', token);
                localStorage.setItem('currentUserID', _id);
                localStorage.setItem('currentUserName', name)
                this.props.closeModal();
              }}
              update={(client, data) => this.updateCache(client, data)}
          >
          {signupUser => (
            <div className="signupModal">
              <form className="signupForm"
                onSubmit={e => {
                  e.preventDefault();
                  this.setState({ errors: null })
                  signupUser({
                    variables: {
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <img src={elephant} className="elenav" /><h1>Elephant Surprise</h1>
                {this.errorTips()}
                <input
                  className="Authinput"
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
                  data-tip data-for={'name'}
                />
                <input
                  className="Authinput"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                  data-tip data-for={'email'}
                />
                <input
                  className="Authinput"
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                  data-tip data-for={'password'}
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