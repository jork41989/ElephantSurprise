import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import ReactTooltip from 'react-tooltip'

const { FETCH_WISHLIST } = Queries;
const { UPDATE_ITEM } = Mutations;


class ItemElement extends Component{
  constructor(props){
    super(props)

    this.state ={
      url: this.props.item.url,
      price: this.props.item.price,
      editing: false,
      errors: null
    }
    this.handleEdit = this.handleEdit.bind(this);

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

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render(){

    if (this.state.editing){
    return(
      <div>
        <button
          onClick={this.handleEdit}
          style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
        >
          ✎
          </button>
      

      <Mutation mutation={UPDATE_ITEM}
        refetchQueries={() => {
          return [
            {
              query: FETCH_WISHLIST,
              variables: { _id: "5dcc9aadb61a8950f661eae3" }
            }
          ];
        }}
        onError={err => this.setState({ message: err.message })}
        onCompleted={ data => {
          this.setState({
            url: this.props.item.url,
            price: this.props.item.price,
            editing: false,
            errors: null
          })
        }}
    >

        {(updateItem, data) => (

          <form
            className="item-update"
            onSubmit={e => {
              e.preventDefault();
              this.setState({
                errors: null
              });
              updateItem({
                variables: {
                  item_id: this.props.item._id,
                  url: this.state.url,
                  price: parseFloat(this.state.price),
                  purchased: this.props.item.purchased
                }
              })
            }}
          >

        {this.errorTips()}
        <input
          value={this.state.url}
          onChange={this.update("url")}
          id={'email'}
          data-tip data-for={'url'}
        />
        <input
          value={ "$", this.state.price}
          onChange={this.update("price")}
          id={'email'}
          data-tip data-for={'price'}
        />
        

        <button type="submit">Update Item</button>

      </form>
    )}
      </Mutation>

      </div>

    )
    }else{
      return (
        <div>
          <button
            onClick={this.handleEdit}
            style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
          >
            ✎
          </button>
          <p>{this.state.url}</p>
          <p>{this.state.price}</p>
        </div>
      );      
    }

  }
}

export default ItemElement;