const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString},
    loggedIn: { type: GraphQLBoolean },
    hosted_exchanges: {
      type: new GraphQLList (require ('./exchange_type')),
      resolve(parentValue){
        return User.fetchHostedExchanges(parentValue._id)
      }
    },
    participated_exchanges: {
      type: new GraphQLList(require('./exchange_type')),
      resolve(parentValue) {
        return User.fetchParticipatedExchanges(parentValue._id)
      }
    },
    owned_lists: {
      type: new GraphQLList(require('./wish_list_type')),
      resolve(parentValue) {
        return User.fetchOwnedLists(parentValue._id)
      }
    },
    pending_invites: {
      type: new GraphQLList(require('./exchange_type')),
      resolve(parentValue) {
        return User.fetchInvites(parentValue._id)
      }
    }
  })
});

module.exports = UserType;