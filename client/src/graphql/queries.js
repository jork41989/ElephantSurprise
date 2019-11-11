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
  `

}

// currentUser @client{
//   name
//   id
// }