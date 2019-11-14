import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

const { FETCH_WISHLIST } = Queries;
const { UPDATE_ITEM } = Mutations;


class ItemElement extends Component{
  constructor(props){
    super(props)

    this.state ={
      editing: false
    }

  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  render(){

    return(

      <Mutation mutation={UPDATE_ITEM}
        refetchQueries={() => {
          return [
            {
              query: FETCH_WISHLIST,
              variables: { _id: "5dcc9aadb61a8950f661eae3" }
            }
          ];
        }}
      >

        {item.url}
        <p>${item.price}</p>


      </Mutation>

    )


  }


}