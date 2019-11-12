const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model("user");
const Exchange = mongoose.model("exchange");
const WishList = mongoose.model("wish_list");

const WishListType = new GraphQLObjectType({
  name: "WishListType",
  fields: () => ({
    _id: { type: GraphQLID },
    shipping_address: { type: GraphQLString },
    owner: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.owner)
      }
    },
    santa: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.santa)
      }
    },
    exchange: {
      type: require("./exchange_type"),
      resolve(parentValue) {
        return Exchange.findById(parentValue.exchange)
      }
    },
    items: {
      type: new GraphQLList(require("./item_type")),
      resolve(parentValue) {
        return WishList.findItems(parentValue._id);
      }
    }
  })
});

module.exports = WishListType;