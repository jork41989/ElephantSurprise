const graphql = require("graphql"),
      mongoose = require("mongoose");
      
const {
      GraphQLObjectType,
      GraphQLString,
      GraphQLInt,
      GraphQLID,
      GraphQLBoolean
    } = graphql;
const GraphQLDate = require('graphql-date');
      
const AuthService = require("../services/auth");

const UserType = require("./types/user_type");
const ExchangeType = require("./types/exchange_type");
    
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
  //exchange mutations
    newExchange: {
      type: ExchangeType,
      args: {
        name: { type: GraphQLString },
        start_date: { type: GraphQLDate },
        ship_date: { type: GraphQLDate },
        budget: { type: GraphQLInt },
        host_id: { type: GraphQLID }
      },
      async resolve(_, { name, start_date, ship_date, budget, host_id }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        if (validUser.loggedIn) {
          return new Product({ name, start_date, ship_date, budget, host_id }).save();
        } else {
          throw new Error('Sorry, you need to be logged in to create a exchange.');
        }
      }
    }
  }
});

module.exports = mutation;