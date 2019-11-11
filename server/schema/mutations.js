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

const User = require("../models/User");
const UserType = require("./types/user_type");
const Exchange = require("../models/Exchange");
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
    //user mutations
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
    },
    addHostExchange: {
      type: UserType,
      args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
      resolve(parentValue, { exchangeId, userId }) {
        return User.addHostExchange(exchangeId, userId);
      }
    },
    removeHostExchange: {
      type: UserType,
      args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
      resolve(parentValue, { exchangeId, userId }) {
        return User.removeHostExchange(exchangeId, userId);
      }
    },
    addParticipatedExchange: {
      type: UserType,
      args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
      resolve(parentValue, { exchangeId, userId }) {
        return User.addParticipatedExchange(exchangeId, userId);
      }
    },
    removeParticipatedExchange: {
      type: UserType,
      args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
      resolve(parentValue, { exchangeId, userId }) {
        return User.removeParticipatedExchange(exchangeId, userId);
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
      // async resolve(_, { name, start_date, ship_date, budget, host_id }, ctx) {
      //   const validUser = await AuthService.verifyUser({ token: ctx.token });

      //   if (validUser.loggedIn) {
      //     return new Exchange({ name, start_date, ship_date, budget, host_id }).save()
      //       .then(exchange => {
      //         User.addHostExchange(exchange._id, host_id);
      //       });
      //   } else {
      //     throw new Error('Sorry, you need to be logged in to do that.');
      //   }
      // }
      resolve(_, { name, start_date, ship_date, budget, host_id }) {
        return new Exchange({ name, start_date, ship_date, budget, host_id }).save()
          .then(exchange => {
            User.addHostedExchange(exchange._id, host_id);
            return exchange;
          });
      }
    },
    updateExchange: {
      type: ExchangeType,
      args: {
        exchange_id: { type: GraphQLID },
        name: { type: GraphQLString },
        start_date: { type: GraphQLDate },
        ship_date: { type: GraphQLDate },
        budget: { type: GraphQLInt }
      },
      resolve(_, args) {
        let params = {};
        for (let prop in args) if (args[prop]) params[prop] = args[prop];
        return Exchange.findOneAndUpdate({ _id: params.exchange_id }, params, { new: true })
      }
    },
    deleteExchange: {
      type: ExchangeType,
      args: {
        exchange_id: { type: GraphQLID }
      },
      resolve(_, { exchange_id }) {
        return Exchange.findOneAndDelete({ _id: exchange_id }).then(
          exchange => {
            User.removeHostedExchange(exchange._id, exchange.host_id);
            return exchange;
          }
        );
      }
    },
    addParticipant: {
      type: ExchangeType,
      args: {
        exchange_id: { type: GraphQLID },
        user_id: { type: GraphQLID }
      },
      resolve(_, { exchange_id, user_id }) {
        return Exchange.findOneAndUpdate(
          { _id: exchange_id }, 
          { $push: { participant_ids: user_id } }, 
          { new: true } 
        ).then(
          exchange => {
              User.addParticipatedExchange(exchange_id, user_id);
              return exchange;
          }
        );
      }
    }
  }
});

module.exports = mutation;