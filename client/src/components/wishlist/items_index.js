import React, {Component} from  "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import ItemElement from "./item_element";
import Microlink from '@microlink/react';

const { FETCH_WISHLIST } = Queries;
const { UPDATE_ITEM, REMOVE_ITEM } = Mutations;


class ItemsIndex extends Component{

  constructor(props){
    super(props)

  }

  updateYes(item_id, updateItem) {
    updateItem({
      variables: {
        item_id: item_id,
        purchased: true
      }
    });
  }

  updateNo(item_id, updateItem) {
    updateItem({
      variables: {
        item_id: item_id,
        purchased: false
      }
    });
  }

  render(){


    if(this.props.owner === this.props.user){
    return(
      <div>

        {this.props.items.map(item => (
          <div key={item._id}>

            <ItemElement item={item} wishlist={this.props.wishlist}/>

          </div>
        ))}




      </div>
    )
    } else if (this.props.santa && this.props.santa._id === this.props.user) {
     return(
       <div>
        {this.props.items.map(item => {
          let yesColor;
          let noColor;
          if (item.purchased) {
            yesColor = "#009933";
            noColor ="lightgrey";
          } else {
            yesColor = "lightgrey";
            noColor = "rgb(241, 94, 89)";
          }
          return (
            <div key={item._id}>
              <Microlink url={item.url} />
              <p>{item.price}</p>
              <p>Purchased?</p>
              <Mutation
                mutation={UPDATE_ITEM}
                onError={err => console.log(err)}
                onCompleted={data => {
                  
                }}
              >{(updateItem) => (
                <div className="purchase-status">
                  <p onClick={() => { this.updateYes(item._id, updateItem) }} style={{ cursor: "pointer" }}>Yes</p>
                  <i className="far fa-check-square" style={{ color: yesColor}}></i>
                  <p onClick={() => { this.updateNo(item._id, updateItem) }} style={{ cursor: "pointer" }}>No</p>
                  <i className="far fa-check-square" style={{ color: noColor }}></i>
                </div>
              )}
              </Mutation>
            </div>
          );
        })}
      </div>
      )
    } else if (this.props.host._id === this.props.user) {
      return (
        <div>
          {this.props.items.map(item => {
            let yesColor;
            let noColor;
            if (item.purchased) {
              yesColor = "#009933";
              noColor = "lightgrey";
            } else {
              yesColor = "lightgrey";
              noColor = "rgb(241, 94, 89)";
            }
            return (
              <div key={item._id}>
                <Microlink url={item.url} />
                <p>{item.price}</p>
                <p>Purchased?</p>
                <div className="purchase-status">
                  <p>Yes</p>
                  <i className="far fa-check-square" style={{ color: yesColor }}></i>
                  <p>No</p>
                  <i className="far fa-check-square" style={{ color: noColor }}></i>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          {this.props.items.map(item => (
            <div key={item._id}>
              <Microlink url={item.url} />
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )
    }
  }

}
export default ItemsIndex;