const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLBoolean } = graphql;
const GraphQLDate = require('graphql-date');
const User = mongoose.model("user");
const Exchange = mongoose.model("exchange");

const ExchangeType = new GraphQLObjectType({
  name: "ExchangeType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    start_date: { type: GraphQLDate },
    ship_date: { type: GraphQLDate },
    budget: { type: GraphQLInt },
    santa_assigned: { type: GraphQLBoolean },
    host: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.host)
      }
    },
    participants: {
      type: new GraphQLList(require("./user_type")),
      resolve(parentValue) {
        return Exchange.findParticipants(parentValue._id);
      }
    },
    wish_lists: {
      type: new GraphQLList(require("./wish_list_type")),
      resolve(parentValue) {
        return Exchange.findWishLists(parentValue._id);
      }
    }
  })
});

module.exports = ExchangeType;