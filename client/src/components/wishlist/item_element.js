import React, { Component } from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import ReactTooltip from 'react-tooltip';
import Microlink from '@microlink/react';

const { FETCH_WISHLIST } = Queries;
const { UPDATE_ITEM, REMOVE_ITEM } = Mutations;


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
        <Microlink url={this.state.url} />
        <i class="fas fa-window-close" onClick={this.handleEdit}/>
        <Mutation mutation={UPDATE_ITEM}
          refetchQueries={() => {
            return [
              {
                query: FETCH_WISHLIST,
                variables: { _id: this.props.wishlist }
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
              <label>Item URL:
                <input
                  value={this.state.url}
                  onChange={this.update("url")}
                  id={'email'}
                  data-tip data-for={'url'}
                />
              </label>
              <label>Value:
                <input
                  value={ "$", this.state.price}
                  onChange={this.update("price")}
                  id={'email'}
                  data-tip data-for={'price'}
                />
              </label>
              <button type="submit">Update Item</button>
            </form>
          )}
        </Mutation>
      </div>

    )
    }else{
      return (
        <div className="itemDiv">
          <Microlink url={this.state.url} />
          <div>
            <p>${this.state.price}</p>
            <div className="editIcon">
              <i class="fas fa-edit " onClick={this.handleEdit}></i>
              <Mutation mutation={REMOVE_ITEM}
                refetchQueries={() => {
                  return [
                    {
                      query: FETCH_WISHLIST,
                      variables: { _id: this.props.wishlist }
                    }
                  ];
                }}

              >
                {(deleteItem, data) => (

                  <i class="fas fa-trash-alt" onClick={e => {
                    e.preventDefault();
                    deleteItem({
                      variables: { item_id: this.props.item._id }
                    })
                  }}></i>

                )}
              </Mutation>

            </div>
          </div>
          
        </div>
      );      
    }

  }
}

export default ItemElement;