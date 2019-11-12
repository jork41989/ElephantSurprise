  import React, {Component} from "react";
  import { Query } from "react-apollo";
  import Queries from "../../graphql/queries";
  import ExchangeUsers from "./exchange_users";
  import InviteUser from "./invite_user";
  const { FETCH_EXCHANGE } = Queries;

class ExchangeShow extends Component {

  constructor(props){
    super(props);


  }

  render(){
    console.log(this.props.user)
    return (
      <Query query={FETCH_EXCHANGE} variables={{ _id: this.props.user.hosted_exchanges[0]._id }} >  {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        if (this.props._id === data.exchange.host_id){

        return(
          <div className={ExchangeShow}>

          
          <h1>
            Welcome to Your Exchange!
          </h1>

          <h2> Host {this.props.user.name} </h2>

            {/* <LetsSurprise/> */}
            {/* <InviteUser/> */}
            <ExchangeUsers participants={data.participants}/>
            {/* <Errors /> */}

          </div>

        )
     }else{

      return(
        <div className={ExchangeShow}>
          <h2> Welcome to {this.props.host_id.name} Exchange, Gifter {this.props.user.name}! </h2>
        </div>
      )

      }
      }}
    </Query>)

  }

}
  
  export default ExchangeShow;