import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
const {  } = Queries;
const {  } = Mutations

class AssignSanta extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <Mutation
      //   mutation={UPDATE_WISHLIST}
      //   onCompleted={data => {
          
      //   }}
      // >
      //   {(updateWishList) => (
          <button>Confirm Roulette</button>
      //   )}
      // </Mutation>
    );
  }
}

export default AssignSanta;