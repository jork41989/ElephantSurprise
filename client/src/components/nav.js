import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import Modal from './modal/modal'
const { IS_LOGGED_IN } = Queries;

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      type: ""
    };
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal (){
    this.setState({modal: false, type: false})
  }
  render(){
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div>
                  <Link to="/dashboard" className="navBtn">Dashboard</Link>
                <button
                    className="navBtn"
                  onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("currentUserID");
                    localStorage.removeItem("currentUserName");
                    client.writeData({ data: { isLoggedIn: false, CurrentUserID: '', CurrentUserName: '' } });
                    this.props.history.push("/");
                  }}
                >
                  Logout
                </button>
                </div>
              );
            } else {
              return (
                <div>
                  <button onClick={() => this.setState({ modal: true, type: "login" })} className="navBtn">Login</button>
                  < button onClick={() => this.setState({ modal: true, type: "signup" })} className="navBtn"> Sign Up </ button>
                  <Modal closeModal={this.closeModal} type={this.state.type}/>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
        }
};

export default withRouter(Nav);