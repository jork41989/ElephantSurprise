import React, { Component } from "react";

class SantaList extends Component {
  constructor(props) {
    super(props);
  }

  santaList() {
    return this.props.wish_lists.map(
      wish_list => {
        return (
          <li key={wish_list._id}>
            <div>{wish_list.santa.name}</div>
            <i className="fas fa-gift" />
            <i className="fas fa-arrow-down" />
            <div>{wish_list.owner.name}</div>
          </li>
        );
      }
    );
  }

  render() {
    return (
      <div className="roulette-main">
        <ul>
          {this.santaList()}
        </ul>
      </div>
    );
  }
}

export default SantaList;
