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
<<<<<<< HEAD
    // console.log(this.props.items)
=======
    console.log(this.props.items)

    if(this.props.owner===this.props.user){
>>>>>>> 64bdaf8... creates check for current owner of wishlist to allow mutation elements or not
    return(
      <ul>

        {this.props.items.map(item => (
          <li key={item._id}>

            <ItemElement item={item} wishlist={this.props.wishlist}/>

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
                <button onClick={e => {
                  e.preventDefault();
                  deleteItem({
                    variables: { item_id: item._id}
                  })
                }}>
                  Delete Item
                </button>
              )}
            </Mutation>


          </li>
        ))}




      </ul>
    )
   }else{
     return(
       <ul>
        {this.props.items.map(item => (
          <li key={item._id}>
            <p>{item.url}</p>
            <p>{item.price}</p>
          </li>
        ))}
      </ul>
    )
   }
  }

}
export default ItemsIndex;