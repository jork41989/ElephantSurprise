const graphql = require("graphql"),
      mongoose = require("mongoose");
      
const {
      GraphQLObjectType,
      GraphQLString,
      GraphQLInt,
      GraphQLID
    } = graphql;
      
const AuthService = require("../services/auth");

      

const UserType = require("./types/user_type");
    
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
      register: {
      type: UserType,
      args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.register(args);
      }
    },
      logout: {
        type: UserType,
        args: {
          _id: { type: GraphQLID }
        },
        resolve(_, args) {
          return AuthService.logout(args);
        }
    },
  //Add New Mutations Below
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  //Add New Mutations Above
  
    }
      });

module.exports = mutation;