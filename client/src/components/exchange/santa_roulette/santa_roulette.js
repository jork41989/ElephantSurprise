import React, { Component } from "react";
import { shuffle } from "lodash";
import AssignSanta from "./assign_santa";
import "./santa_roulette.css";


class SantaRoulette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_list: [],
      button: null
    }

    this.startRoulette = this.startRoulette.bind(this);
  }

  startRoulette() {
    const user_list = shuffle(this.props.participants);
    this.setState({ user_list: user_list });
    if (user_list.length > 1) {
      this.setState({ button: <AssignSanta 
        user_list={user_list}
        exchange_id={this.props.exchange_id}
        fireRefetch={this.props.fireRefetch}
      /> });
    }
  }

  showList() {
    if (this.state.user_list.length > 1) {
      return this.state.user_list.map(
        (user, i) => {
          if (i !== this.state.user_list.length - 1) {
            return (
              <li key={user._id}>
                <div>{user.name}</div>
                <i className="fas fa-gift"/>
                <i className="fas fa-arrow-down"/>
                <div>{this.state.user_list[i + 1].name}</div>
              </li>
            );
          } else if (i === this.state.user_list.length - 1) {
            return (
              <li key={user._id}>
                <div>{user.name}</div>
                <i className="fas fa-gift" />
                <i className="fas fa-arrow-down" />
                <div>{this.state.user_list[0].name}</div>
              </li>
            );
          }
        }
      );
    }
    
  }

  render() {
    return (
      <div className="roulette-main">
        <button onClick={this.startRoulette}>Santa Roulette!</button>
        <ul>
          {this.showList()}
        </ul>
        {this.state.button}
      </div>
    );
  }
}

export default SantaRoulette;