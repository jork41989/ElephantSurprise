import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql `
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  CURRENT_USER: gql`
    query CurrentUserFind {
      CurrentUserID @client 
      CurrentUserName @client 
    }
  `,
  FETCH_USER: gql `
  query fecthUser($_id: ID!) {
    user(_id: $_id){
      name,
      email
      participated_exchanges{
        name
        _id
      }
      hosted_exchanges{
        _id
      }
    }
  }
  `,
  FETCH_EXCHANGE: gql`
    query exchange($exchangeId: ID!) {
      exchange(_id: $exchangeId )


    }
  `,  
}

