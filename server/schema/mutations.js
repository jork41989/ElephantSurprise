const graphql = require("graphql"),
      mongoose = require("mongoose");
      
const {
      GraphQLObjectType,
      GraphQLString,
      GraphQLInt,
      GraphQLFloat,
      GraphQLID,
      GraphQLBoolean,
      GraphQLList
    } = graphql;
const GraphQLDate = require('graphql-date');
      
const AuthService = require("../services/auth");

const User = require("../models/User");
const UserType = require("./types/user_type");
const Exchange = require("../models/Exchange");
const ExchangeType = require("./types/exchange_type");
const WishList = require("../models/WishList");
const WishListType = require("./types/wish_list_type");
const Item = require("../models/Item");
const ItemType = require("./types/item_type");
    
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
    // addWishList: {
    //   type: UserType,
    //   args: { exchangeId: { type: GraphQLID }, listId: { type: GraphQLID }, userId: { type: GraphQLID } },
    //   resolve(parentValue, { exchangeId, listId, userId }) {
    //     return User.addWishList(exchangeId, listId, userId);
    //   }
    // },
    // removeWishList: {
    //   type: UserType,
    //   args: { exchangeId: { type: GraphQLID }, listId: { type: GraphQLID }, userId: { type: GraphQLID } },
    //   resolve(parentValue, { exchangeId, listId, userId }) {
    //     return User.removeWishList(exchangeId, listId, userId);
    //   }
    // },
    // addHostExchange: {
    //   type: UserType,
    //   args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
    //   resolve(parentValue, { exchangeId, userId }) {
    //     return User.addHostExchange(exchangeId, userId);
    //   }
    // },
    // removeHostExchange: {
    //   type: UserType,
    //   args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
    //   resolve(parentValue, { exchangeId, userId }) {
    //     return User.removeHostExchange(exchangeId, userId);
    //   }
    // },
    // addParticipatedExchange: {
    //   type: UserType,
    //   args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
    //   resolve(parentValue, { exchangeId, userId }) {
    //     return User.addParticipatedExchange(exchangeId, userId);
    //   }
    // },
    // removeParticipatedExchange: {
    //   type: UserType,
    //   args: { exchangeId: { type: GraphQLID }, userId: { type: GraphQLID } },
    //   resolve(parentValue, { exchangeId, userId }) {
    //     return User.removeParticipatedExchange(exchangeId, userId);
    //   }
    // },
    //exchange mutations
    newExchange: {
      type: ExchangeType,
      args: {
        name: { type: GraphQLString },
        start_date: { type: GraphQLDate },
        ship_date: { type: GraphQLDate },
        budget: { type: GraphQLInt },
      },
      async resolve(_, { name, start_date, ship_date, budget }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        if (validUser.loggedIn) {
          return new Exchange({ name, start_date, ship_date, budget, host: validUser._id }).save()
            .then(exchange => {
              return User.addHostedExchange(exchange._id, exchange.host)
                .then(() => new WishList({ owner: exchange.host, exchange: exchange._id }).save()
                  .then(wishList => {
                    return User.addWishList(exchange._id , wishList._id, exchange.host).then(() => {return exchange});
                   
                  }))
            });
        } else {
          throw new Error('Sorry, you need to be logged in to do that.');
        }
      },
      // resolve(_, { name, start_date, ship_date, budget, host }) {
      //   return new Exchange({ name, start_date, ship_date, budget, host }).save()
      //     .then(exchange => {
      //       User.addHostedExchange(exchange._id, host);
      //       return exchange;
      //     });
      // }
    },
    addInvite: {
      type: new GraphQLList(UserType),
      args: {
        exchange_id: { type: GraphQLID }, 
        user_ids: { type: new GraphQLList(GraphQLID) } 
      },
      resolve(_, { exchange_id, user_ids }) {
        return User.updateMany(
          { _id: user_ids },
          { $push: { pending_invites: exchange_id } }
        ).then(() => {
          return User.find({_id: user_ids})
        });
      }
    },
    deleteInvite: {
      type: UserType,
      args: { exchangeId: { type: GraphQLID }, userId: {type: GraphQLID} },
      resolve(_, { exchangeId, userId}) {
        return User.findOneAndUpdate(
          {_id: userId},
          {$pull: {pending_invites: exchangeId } },
          { new: true } )
          .then(user => user)
          .catch(err => err)
      }
    },
    updateExchange: {
      type: ExchangeType,
      args: {
        exchange_id: { type: GraphQLID },
        name: { type: GraphQLString },
        start_date: { type: GraphQLDate },
        ship_date: { type: GraphQLDate },
        budget: { type: GraphQLInt },
        santa_assigned: { type: GraphQLBoolean },
        host: { type: GraphQLID }
      },
      resolve(_, args) {
        let params = {};
        for (let prop in args) if (args[prop] !== null) params[prop] = args[prop];
        return Exchange.findOneAndUpdate({ _id: params.exchange_id }, params, { new: true });
      }
    },
    deleteExchange: {
      type: ExchangeType,
      args: {
        exchange_id: { type: GraphQLID }
      },
      resolve(_, { exchange_id }) {
        return Exchange.findOneAndDelete({ _id: exchange_id }).then(
          async exchange => {
            await exchange.wish_lists.forEach(
              async wish_list_id => {
                await WishList.findOneAndDelete({_id: wish_list_id}).then(
                    async wish_list => {
                    await exchange.participants.forEach(
                      async userId => {
                        await User.removeParticipatedExchange(exchange_id, userId)
                        await User.deleteWishList(wish_list_id ,userId)
                      }
                    )
                    await Item.deleteMany({ _id: wish_list.items });
                  }
                );
              }
            );
            
            await User.removeHostedExchange(exchange_id, exchange.host  )
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
          { $push: { participants: user_id } }, 
          { new: true } 
        ).then(
          exchange => {
              User.addParticipatedExchange(exchange_id, user_id);
              return exchange;
          }
        );
      }
    },
    removeParticipant: {
      type: ExchangeType,
      args: {
        exchange_id: { type: GraphQLID },
        user_id: { type: GraphQLID }
      },
      resolve(_, { exchange_id, user_id }) {
        return Exchange.findOneAndUpdate(
          { _id: exchange_id },
          { $pull: { participants: user_id } },
          { new: true }
        ).then(
          exchange => {
            User.removeParticipatedExchange(exchange_id, user_id);
            return exchange;
          }
        );
      }
    },
    //wish list mutations
    newWishList: {
      type: WishListType,
      args: {
        owner_id: { type: GraphQLID },
        exchange_id: { type: GraphQLID }
      },
      resolve(_, { owner_id, exchange_id }) {
        return new WishList({ owner: owner_id, exchange: exchange_id }).save()
          .then(wishList => {
            User.addWishList(exchange_id, wishList._id, owner_id);
            return wishList;
          });
      }
    },
    updateWishList: {
      type: WishListType,
      args: {
        wish_list_id: { type: GraphQLID },
        shipping_address: { type: GraphQLString },
        santa: { type: GraphQLID }
      },
      resolve(_, args) {
        let params = {};
        for (let prop in args) if (args[prop] !== null) params[prop] = args[prop];
        return WishList.findOneAndUpdate({ _id: params.wish_list_id }, params, { new: true });
      }
    },
    deleteWishList: {
      type: WishListType,
      args: {
        wish_list_id: { type: GraphQLID }
      },
      resolve(_, { wish_list_id }) {
        return WishList.findOneAndDelete({ _id: wish_list_id }).then(
          wish_list => {
            return Item.deleteMany({ _id: wish_list.items }).then(
              () => wish_list
            );
          }
        );
      }
    },
    //item mutations
    newItem: {
      type: ItemType,
      args: {
        url: { type: GraphQLString },
        price: { type: GraphQLFloat },
        owner_id: { type: GraphQLID },
        wish_list_id: { type: GraphQLID }
      },
      resolve(_, { url, price, owner_id, wish_list_id }) {
        return new Item({ url, price, owner: owner_id, wish_list: wish_list_id }).save()
          .then(item => {
            return WishList.findOneAndUpdate(
              { _id: wish_list_id },
              { $push: { items: item._id } },
              { new: true }
            ).then(() => item);
          });
      }
    },
    updateItem: {
      type: ItemType,
      args: {
        item_id: { type: GraphQLID },
        url: { type: GraphQLString },
        price: { type: GraphQLFloat },
        purchased: { type: GraphQLBoolean }
      },
      resolve(_, args) {
        let params = {};
        for (let prop in args) if (args[prop] !== null) params[prop] = args[prop];
        return Item.findOneAndUpdate({ _id: params.item_id }, params, { new: true });
      }
    },
    deleteItem: {
      type: ItemType,
      args: {
        item_id: { type: GraphQLID }
      },
      resolve(_, { item_id }) {
        return Item.findOneAndDelete({ _id: item_id });
      }
    },
    // additional mutations
  }
});

module.exports = mutation;