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
        type
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
          owner{
            _id
            name
          }
          santa{
            _id
            name
          }
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
  FETCH_WISH_LIST: gql`
    query fetch_wish_list($exchange_id: ID!, $user_id: ID!) {
      fetch_wish_list(exchange_id: $exchange_id, user_id: $user_id) {
        _id
        owner{
          _id
          name
        }
        shipping_address
        santa{
          _id
          name
        }
        exchange{
          _id
          name
        }
        items{
          _id
          url
          price
          purchased
        }
      }
    }
  `,
  FETCH_WISHLIST: gql`
    query fetchWishlist($_id: ID!){
      wish_list(_id: $_id){
          _id
        owner{
          _id
          name
        }
        shipping_address
        santa{
          _id
          name
        }
        exchange{
          _id
          name
        }
        items{
          _id
          url
          price
          purchased
        }
      }
    }
  `,
  FETCH_ITEM: gql`
    query item($_id: ID!){
      item(_id: $_id){
        _id
        url
        price
        purchased
        owner
        wish_list{
          _id
          owner
          shipping_address
          santa
          exchange
        }
      }
    }
  `
}

