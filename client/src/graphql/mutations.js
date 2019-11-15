import gql from "graphql-tag";

export default {
LOGIN_USER: gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
      _id
      name
    }
  }
  `,
SIGNUP_USER: gql`
  mutation registerUser($name: String!, $email: String!, $password: String!){
    register(name: $name, email: $email, password: $password){
      token,
      loggedIn
      name
      _id
    }
  }
`,
VERIFY_USER: gql`
mutation VerifyUser($token: String!) {
  verifyUser(token: $token) {
    loggedIn
    name
    _id
  }
}
`,
NEW_EXCHANGE: gql`
mutation createExchange($name: String!, $start_date: Date!, $ship_date: Date!, $budget: Int!, $type: String){
  newExchange(name: $name, start_date: $start_date, ship_date: $ship_date, budget: $budget, type: $type){
    name
    _id
  }
}
  `,
  REMOVE_EXCHANGE: gql` 
  mutation deleteExchange($exchange_id: ID!){
    deleteExchange(exchange_id: $exchange_id){
      _id
   }
  }
`,
INVITE_USER: gql`
mutation addInvite($exchange_id: ID!, $user_ids: [ID!]) {
  addInvite( exchange_id: $exchange_id, user_ids: $user_ids ){
    _id
    name
    pending_invites{
      _id
      name
    }
  }
}
`,
DELETE_INVITE: gql`
mutation deleteInvite($exchange_id: ID!, $user_id: ID!) {
  deleteInvite( exchange_id: $exchange_id, user_id: $user_id){
    _id
    name
    pending_invites{
      _id
      name
    }
  }
}
`,
ACCEPT_INVITE: gql`
mutation addParticipant($exchange_id: ID!, $user_id: ID!){
  addParticipant(exchange_id: $exchange_id, user_id: $user_id){
    _id
    name
    participants{
      _id
      name
      pending_invites{
        _id
      }
    }
  }
}
`,
ACCEPT_INVITE_A: gql`
mutation acceptAndUpdate($exchange_id: ID!, $user_id: ID!){
  mutation1: addParticipant(exchange_id: $exchange_id, user_id: $user_id){
    _id
    name
    participants{
      _id
      name
      pending_invites{
        _id
      }
    }
  }
  mutation2: deleteInvite( exchange_id: $exchange_id, user_id: $user_id){
    _id
    name
    pending_invites{
      _id
      name
    }
  }
}
`,
ADD_ITEM: gql`
mutation newItem(
  $url: String!,
  $price: Float!,
  $owner_id: ID!,
  $wish_list_id: ID!){
    newItem(
      url: $url,
      price: $price,
      owner_id: $owner_id,
      wish_list_id: $wish_list_id
    ){
      _id
      url
      price
      purchased
    }

  }
`,
UPDATE_ITEM: gql`
mutation updateItem(
  $item_id: ID!,
  $url: String!,
  $price: Float!,
  $purchased: Boolean!){
    updateItem(
      item_id: $item_id,
      url: $url,
      price: $price,
      purchased: $purchased){
        _id
        url
        price
        purchased
    }
  }
`,

REMOVE_ITEM: gql`
mutation deleteItem( $item_id: ID!){
  deleteItem(item_id: $item_id){
    _id
    url
    price
    purchased
  }
}
`,
REMOVE_MEMBER: gql`
  mutation removeMember($wish_list_id: ID!, $user_id: ID!, $exchange_id: ID!) {
    removeMember(wish_list_id: $wish_list_id, user_id: $user_id, exchange_id: $exchange_id) {
      _id
      name
    }
  }
`,
UPDATE_SHIPPING: gql`
  mutation updateShipping($wish_list_id: ID!, $shipping_address: String!) {
    updateWishList(wish_list_id: $wish_list_id, shipping_address: $shipping_address) {
      _id
      shipping_address
    }
  }
`

}