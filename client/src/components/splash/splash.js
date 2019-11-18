import React, { Component } from "react";
import Modal from '../modal/modal'
import { Link, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import channukahBG from '../../images/chanukah.jpg'
import officeBG from '../../images/officeHoliday.jpg'
import christmasBG from '../../images/xmasBG.jpg'
import otherBG from '../../images/Other.jpg'
import "./splash.css"
const { IS_LOGGED_IN } = Queries;


class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      type: ""
    };
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState({ modal: false, type: false })
  }
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                 <div>
                    <Carousel showThumbs={false} autoPlay={true}>
                    <div>
                      <img src={officeBG}  className="HomeImg"/>
                      <div className="sliderButtons">
                          <h1>Welcome to Elephant Surprise</h1>
                          <Link to='/dashboard' className="sliderLink">Dashboard</Link>
                      </div>
                    </div>
                      <div>
                        <img src={christmasBG} className="HomeImg" />
                        <div className="sliderButtons">
                          <h1>Welcome to Elephant Surprise</h1>
                          <Link to='/dashboard' className="sliderLink">Dashboard</Link>
                        </div>
                      </div>
                    </Carousel>

                </div>
                );
              } else {
                return (
                  <div>
                    <Carousel showThumbs={false} autoPlay={true}>
                    <div>
                      <img src={officeBG} className="HomeImg" />
                      <div className="sliderButtons">
                        <h1>Welcome to Elephant Surprise</h1>
                          <button onClick={() => this.setState({ modal: true, type: "login" })} className="authButton">Log In</button>
                      </div>
                    </div>
                      <div>
                        <img src={christmasBG} className="HomeImg" />
                        <div className="sliderButtons">
                          <h1>Welcome to Elephant Surprise</h1>
                          <button onClick={() => this.setState({ modal: true, type: "login" })} className="authButton">Log In</button>
                        </div>
                      </div>
                      <div>
                        <img src={channukahBG} className="HomeImg" />
                        <div className="sliderButtons">
                          <h1>Welcome to Elephant Surprise</h1>
                          <button onClick={() => this.setState({ modal: true, type: "login" })} className="authButton">Log In</button>
                        </div>
                      </div>
                    </Carousel>
                    <Modal closeModal={this.closeModal} type={this.state.type} />
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

export default withRouter(Splash);

