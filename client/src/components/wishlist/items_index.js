import React, {Component} from  "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
// const {FETCH_ITEMS} = Queries;

class ItemsIndex extends Component{

  constructor(props){
    super(props)
  }


  render(){

    return(
      <ul>
        {this.props.items.map(item =>(
          <li>
            {item.url}
            {item.price}
          </li>
        ))}
      </ul>
    )

  }

}
export default ItemsIndex;