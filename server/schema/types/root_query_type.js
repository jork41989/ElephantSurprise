const mongoose = require("mongoose"),
      axios = require("axios");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const User = mongoose.model("user");
const UserType = require("./user_type");
const Exchange = mongoose.model("exchange");
const ExchangeType = require("./exchange_type");


// const secretKey = require("../../../config/keys");



const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    exchanges: {
      type: new GraphQLList(ExchangeType),
      resolve() {
        return Exchange.find({});
      }
    },
    exchange: {
      type: ExchangeType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Exchange.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;
