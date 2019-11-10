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

UserSchema.statics.addWishList = (exchangeId, listId, userId) => {
  const Exchange = mongoose.model('exchange');
  const User =  mongoose.model('user');

  return Exchange.findById(exchangeId).then(exchange => {
    return User.findById(userId).then(user =>{
      exchange.wish_list_ids.push(listId);
      user.owned_lists.push(listId);

      return Promise.all([user.save(), exchange.save()])
       .then( ([ user, exchange ]) => user )

    })
    .catch(err=> res.json(err))
     
  })
  .catch(err => res.json(err))
}

UserSchema.statics.removeWishList = (exchangeId, listId, userId) => {
  
  const Exchange = mongoose.model('exchange');
  const User =  mongoose.model('user');

  return Exchange.findById(exchangeId).then(exchange => {
    return User.findById(userId).then(user => {
      exchange.wish_list_ids.pull(listId);
      User.owned_lists.pull(listId);


      return Promise.all([exchange.save(), user.save()])
       .then(([ user, exchange]) => user );

    }).catch(err => res.json(err))

  })
  .catch(err => res.json(err))
}

UserSchema.statics.addHostedExchange = (exchangeId, userId) => {
  const User = mongoose.model('user');

  return User.findById(userId).then(user => {
    user.hosted_exchanges.push(exchangeId);
    return user.save().then(user => user);
  })
  .catch(err => res.json(err))
}

UserSchema.statics.removeHostedExchange = (exchangeId, userId) => {
  const User = mongoose.model('user');

  return User.findById(userId).then(user =>{
    user.hosted_exchanges.pull(exchangeId);
    return user.save().then(user => user);
  })
}

UserSchema.statics.addParticipatedExchange = (exchangeId, userId) => {
  const User = mongoose.model('user');

  return User.findById(userId).then(user => {
    user.participated_exchanges.push(exchangeId);
    return user.save().then(user => user);
  })
    .catch(err => res.json(err))

}

UserSchema.statics.removeParticipatedExchange = (exchangeId, userId) => {
  const User = mongoose.model('user');

  return User.findById(userId).then(user => {
    user.participated_exchanges.pull(exchangeId);
    return user.save().then(user => user);
  })
}

UserSchema.statics.fetchHostedExchanges = (userId) => {
  const User = mongoose.model('user');

  return User.findById(userId).then(user => {
    // if (user.hosted_exchanges) {
    //   console.log(user.hosted_exchanges);
    //   return user.hosted_exchanges
    // } else {
    //   return ({ msg: "You have no hosted exchanges." })
    // }
    return user.hosted_exchanges
  })
}

UserSchema.statics.fetchParticipatedExchanges = (userId) => {
  const User = mongoose.model('user');

  return User.findById(userId).then(user => {
    // if (user.participated_exchanges) {
    //   console.log(user.participated_exchanges);
    //   return user.participated_exchanges
    // } else {
    //   return ({ msg: "You have no exchanges you've participated in." })
    // }
    return user.participated_exchanges
  })
}

UserSchema.statics.fetchOwnedLists = (userId) => {
  const User = mongoose.model('user');

  return User.findById(userId).then(user => {
    // if (user.owned_lists) {
    //   console.log(user.owned_lists);
    //   return user.owned_lists
    // } else {
    //   return ({ msg: "You have no wishlists." })
    // }
    return user.owned_lists
  })
}



module.exports = mongoose.model("user", UserSchema);
