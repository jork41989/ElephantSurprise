import React, {Component} from 'react';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import ReactTooltip from "react-tooltip";

const {ADD_ITEM} = Mutations;

class ItemInject extends Component{
  constructor(props){
    super(props)
    this.state ={
      url: "",
      price: "",
      errors: ""
    }

    this.errorTips = this.errorTips.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(){

  }

  errorTips() {
    if (this.state.errors) {
      return (
        <ReactTooltip id="email" place="top" type="error" effect="solid">
          <span>{this.state.errors[0].message}</span>
        </ReactTooltip>
      )

    }
  }


  render(){

    return(
      <div>
        <h2>Update Your List with an Item</h2>
        <Mutation mutation={ADD_ITEM}>
          {(newItem, data)=>(

          <form onSubmit={e =>{
            e.preventDefault();
            this.setState({errors: null});
            newItem({
              variables: {
                url: this.state.url,
                price: this.state.price,
                owner_id: this.props.user._id,
                wish_list_id: this.props.wishlist._id
              }
            })
            
          }}>
            {this.errorTips()}

            <input value={this.state.url}
              onChange={this.update("url")}
              ></input>

            <input value={this.state.price}
              onChange={this.update("price")}
              ></input>

          </form>
          )}
        </Mutation>

      </div>

      
    )

  }


}

export default ItemInject;
