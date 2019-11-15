import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
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
  FETCH_USER: gql`
  query fecthUser($_id: ID!) {
    user(_id: $_id){
      _id
      name,
      email
      participated_exchanges{
        name
        _id
      }
      hosted_exchanges{
        _id
      }
      pending_invites{
        _id
        name
      }
      owned_lists{
        _id
        shipping_address
        santa{
          _id
          name
        }
        items{
          url
          price
          purchased
        }
      }
    }
  }
  `,
  FETCH_EXCHANGE: gql`
    query exchange($_id: ID!) {
      exchange(_id: $_id ){
        _id
        name
        start_date
        ship_date
        budget
        santa_assigned
        host{
          _id
          name
        }
        participants{
          _id
          name
        }
        wish_lists{
          _id
        }
        type
      
      }
    }
  `,
  SEARCH_USER: gql`
    query searchUser($key_word: String) {
      searchUser(key_word: $key_word) {
        _id
        name
        email
        participated_exchanges{
          _id
          name
        }
        hosted_exchanges{
          _id
          name
        }
        pending_invites{
          _id
          name
        }
      }
    }
  `,  
}

