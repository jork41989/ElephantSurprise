import React, {Component} from  "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
// const {FETCH_ITEMS} = Queries;

class ItemsIndex extends Component{

  constructor(props){
    super(props)
  }


  render(){
    console.log(this.props.items)
    return(
      <ul>
        {this.props.items.map(item =>(
          <li>
            {item.url}
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    )

  }

}
export default ItemsIndex;