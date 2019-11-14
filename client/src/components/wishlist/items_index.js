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
    // console.log(this.props.items)
    return(
      <ul>

        {this.props.items.map(item => (
          <li>

            <ItemElement item={item}/>

            <Mutation mutation={REMOVE_ITEM}
              refetchQueries={() => {
                return [
                  {
                    query: FETCH_WISHLIST,
                    variables: { _id: "5dcc9aadb61a8950f661eae3" }
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

  }

}
export default ItemsIndex;