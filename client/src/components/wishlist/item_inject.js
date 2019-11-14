import React, {Component} from 'react';
import Mutations from "../../graphql/mutations";
import { Mutation } from "react-apollo";
import ReactTooltip from "react-tooltip";
import "./item_inject.css";
import Queries from "../../graphql/queries";
import Query from "react-apollo";

const {ADD_ITEM} = Mutations;
const {FETCH_WISHLIST} = Queries;

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

  errorTips() {
    if (this.state.errors) {
      return (
        <ReactTooltip id="email" place="top" type="error" effect="solid">
          <span>{this.state.errors[0].message}</span>
        </ReactTooltip>
      )

    }
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
        <Mutation mutation={ADD_ITEM}
          refetchQueries={() => {
            return [
              {
                query: FETCH_WISHLIST,
                variables: { _id: this.props.wishlist }
              }
            ];
          }}
        >


          {(newItem, data)=>(

          <form
           className="item-inject"
           onSubmit={e =>{
            e.preventDefault();
            this.setState({errors: null});
            newItem({
              variables: {
                url: this.state.url,
                price: parseFloat(this.state.price),
                owner_id: this.props.user._id,
                wish_list_id: this.props.wishlist
              }
            })
            
          }}>
            {this.errorTips()}

            <input value={this.state.url}
              onChange={this.update("url")}
              placeholder="Link here to the item"
              ></input>

            <input value={this.state.price}
              onChange={this.update("price")}
              placeholder="Price of your item here(stay in budget!)"
              ></input>

            <button type="submit" value="Add Item">Add Item</button>

          </form>
          )}
        </Mutation>

      </div>

      
    )

  }

}

export default ItemInject;
