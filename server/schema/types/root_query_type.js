const mongoose = require("mongoose"),
      axios = require("axios");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = graphql;

const User = mongoose.model("user");
const UserType = require("./user_type");
const Exchange = mongoose.model("exchange");
const ExchangeType = require("./exchange_type");
const WishList = mongoose.model("wish_list");
const WishListType = require("./wish_list_type");
const Item = mongoose.model("item");
const ItemType = require("./item_type");


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
    },
    wish_lists: {
      type: new GraphQLList(WishListType),
      resolve() {
        return WishList.find({});
      }
    },
    wish_list: {
      type: WishListType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return WishList.findById(args._id);
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve() {
        return Item.find({});
      }
    },
    item: {
      type: ItemType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Item.findById(args._id);
      }
    },
    searchUser: {
      type: new GraphQLList(UserType),
      args: {
        key_word: { type: GraphQLString }
      },
      resolve(_, { key_word }) { 
        if (key_word) {
          return User.find({ $or: [
            { name: new RegExp(key_word, "i") },
            { email: new RegExp(key_word, "i") }
          ]}).limit(5);
        } else {
          return [];
        }
      }
    }
  })
});

module.exports = RootQueryType;
