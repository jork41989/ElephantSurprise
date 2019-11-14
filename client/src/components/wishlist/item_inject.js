import React, {Component} from 'react';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";

const {ADD_ITEM} = Mutations;

class ItemInject extends Component{
  constructor(props){
    super(props)
    this.state ={
      url: "",
      price: ""
    }


  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(){

  }

  render(){

    return(
      <div>
        <h2>Update Your List with an Item</h2>
        <Mutation mutation={ADD_ITEM}>
          <form onSubmit={e =>{

          }}>

          </form>
        </Mutation>

      </div>

      
    )

  }


}

export default ItemInject;
