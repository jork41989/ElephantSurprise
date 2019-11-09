const graphql = require("graphql"),
      mongoose = require("mongoose");
      
const {
      GraphQLObjectType,
      GraphQLString,
      GraphQLInt,
      GraphQLID
    } = graphql;
      
const AuthService = require("../services/auth");

      
const User = require("../../models/User");
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
    },
    addWishList: {
      type: UserType,
      args: { exchangeId: { type: GraphQLID }, listId: { type: GraphQLID }, userId: { type: GraphQLID } },
      resolve(parentValue, { exchangeId, listId, userId }) {
        return User.addWishList(exchangeId, listId, userId);
      }
    },
    removeWishList: {
      type: UserType,
      args: { exchangeId: { type: GraphQLID }, listId: { type: GraphQLID }, userId: { type: GraphQLID } },
      resolve(parentValue, { exchangeId, listId, userId }) {
        return User.removeWishList(exchangeId, listId, userId);
      }
    }

  //Add New Mutations Above
  
    }
      });

module.exports = mutation;