import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
const { ASSIGN_SANTA } = Mutations

class AssignSanta extends Component {
  constructor(props) {
    super(props);

    this.confirmRoulette = this.confirmRoulette.bind(this);
  }

  confirmRoulette(e, assignSanta) {
    e.preventDefault();
    this.props.user_list.forEach(
      (user, i) => {
        if (i === 0) {
          assignSanta({
            variables: {
              owner_id: user._id,
              exchange_id: this.props.exchange_id,
              santa_id: this.props.user_list[this.props.user_list.length - 1]._id
            }
          });
        } else {
          assignSanta({
            variables: {
              owner_id: user._id,
              exchange_id: this.props.exchange_id,
              santa_id: this.props.user_list[i - 1]._id
            }
          });
        }
      }
    );
  }

  render() {
    return (
      <Mutation
        mutation={ASSIGN_SANTA}
        onError={err => console.log(err)}
        onCompleted={data => {
          this.props.fireRefetch();
        }}
      >
        {(assignSanta) => (
          <button onClick={e => { this.confirmRoulette(e, assignSanta) }}>Confirm Roulette</button>
        )}
      </Mutation>
    );
  }
}

export default AssignSanta;