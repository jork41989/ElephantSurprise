const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  hosted_exchanges: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exchange'
    }
  ],
  participated_exchanges: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exchange'
    }
  ],
  owned_lists: [
    {
      type: Schema.Types.ObjectId,
      ref:'Lists'
    }
  ]

})

UserSchema.statics.addWishlist = (exchangeId, listId) => {
  const Exchange = mongoose.model('exchanges');
  const User =  mongoose.model('users');

  return Exchange.findById(exchangeId).then(exchange => {
      exchange.wish_list_ids.push(listId);
      return User.owned_lists.push(listId);
  })
  .catch(err => res.json(err))
}

UserSchema.statics.fetchHostedExchanges = (userId) => {
  const User = mongoose.model('users');

  return User.findById(userId).then(user => {
    if (user.hosted_exchanges) {
      console.log(user.hosted_exchanges);
      return user.hosted_exchanges
    } else {
      return ({ msg: "You have no hosted exchanges." })
    }
  })
}

UserSchema.statics.fetchParticipatedExchanges = (userId) => {
  const User = mongoose.model('users');

  return User.findById(userId).then(user => {
    if (user.participated_exchanges) {
      console.log(user.participated_exchanges);
      return user.participated_exchanges
    } else {
      return ({ msg: "You have no exchanges you've participated in." })
    }
  })
}

UserSchema.statics.fetchOwnedLists = (userId) => {
  const User = mongoose.model('users');

  return User.findById(userId).then(user => {
    if (user.owned_lists) {
      console.log(user.owned_lists);
      return user.owned_lists
    } else {
      return ({ msg: "You have no wishlists." })
    }
  })
}



module.exports = mongoose.model("users", UserSchema);
