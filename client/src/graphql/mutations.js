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
mutation createExchange($name: String!, $start_date: Date!, $ship_date: Date!, $budget: Int!){
  newExchange(name: $name, start_date: $start_date, ship_date: $ship_date, budget: $budget){
    name
    _id
  }
}
  `,
  REMOVE_EXCHANGE: gql ` 
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
DELETE_INVITE: gql `
mutation deleteInvite($exchangeId: ID!, $userId: ID!) {
  deleteInvite( exchangeId: $exchangeId, userId: $userId){
    _id
    name
    pendingInvites{
      _id
    }
  }
}
`,
ADD_PARTICIPANT: gql `
mutation addParticipant($exchange_id: ID!, $user_id: ID!){
  addParticipant(exchange_id: $exchange_id, user_id: $user_id){
    _id
    name
    participants{
      _id
      name
      pendingInvites{
        _id
      }
    }
  }
}
`

}