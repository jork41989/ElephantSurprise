import gql from "graphql-tag";

export default {
LOGIN_USER: gql `
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
      _id
      name
    }
  }
  `,
SIGNUP_USER: gql `
  mutation registerUser($name: String!, $email: String!, $password: String!){
    register(name: $name, email: $email, password: $password){
      token,
      loggedIn
      name
      _id
    }
  }
`,
VERIFY_USER: gql `
mutation VerifyUser($token: String!) {
  verifyUser(token: $token) {
    loggedIn
    name
    _id
  }
}
`,

  NEW_EXCHANGE: gql `
  mutation createExchange($name: String!, $start_date: Date!, $ship_date: Date!, $budget: Int!, $santa_assigned: Boolean!){
    newExchange(name: $name, start_date: $start_date, ship_date: $ship_date, budget: $budget, santa_assigned: $santa_assigned){
      name
      _id
    }
  }
  `
}