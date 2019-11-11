const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql;
const User = mongoose.model("user");
const WishList = mongoose.model("wish_list");

const ItemType = new GraphQLObjectType({
  name: "ItemType",
  fields: () => ({
    _id: { type: GraphQLID },
    url: { type: GraphQLString },
    price: { type: GraphQLFloat },
    purchased: { type: GraphQLBoolean },
    owner: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.owner_id)
      }
    },
    on_wish_list: {
      type: require("./wish_list_type"),
      resolve(parentValue) {
        return WishList.findById(parentValue.wish_list_id)
      }
    }
  })
});

module.exports = ItemType;