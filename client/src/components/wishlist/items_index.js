import React, {Component} from  "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";

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

            <ItemElement props={item}/>

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




            </Mutation>


          </li>
        ))}




      </ul>
    )

  }

}
export default ItemsIndex;