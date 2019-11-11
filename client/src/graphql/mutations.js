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
`
}