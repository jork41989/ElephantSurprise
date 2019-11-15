import React, {Component} from  "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import ItemElement from "./item_element";

const { FETCH_WISHLIST } = Queries;
const { UPDATE_ITEM, REMOVE_ITEM } = Mutations;


class ItemsIndex extends Component{

  constructor(props){
    super(props)

  }

  render(){
    console.log(this.props.items)

    if(this.props.owner===this.props.user){
    return(
      <div>

        {this.props.items.map(item => (
          <div key={item._id}>

            <ItemElement item={item} wishlist={this.props.wishlist}/>

          </div>
        ))}




      </div>
    )
   }else{
     return(
       <div>
        {this.props.items.map(item => (
          <div key={item._id}>
            <p>{item.url}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    )
   }
  }

}
export default ItemsIndex;