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
      ref: 'exchange'
    }
  ],
  participated_exchanges: [
    {
      type: Schema.Types.ObjectId,
      ref: 'exchange'
    }
  ],
  owned_lists: [
    {
      type: Schema.Types.ObjectId,
      ref:'wish_list'
    }
  ]

})

UserSchema.statics.addWishList = (exchangeId, listId, userId) => {
  const Exchange = mongoose.model('exchange');
  const User =  mongoose.model('user');

  return Exchange.findById(exchangeId).then(exchange => {
    return User.findById(userId).then(user =>{
      exchange.wish_lists.push(listId);
      user.owned_lists.push(listId);

      return Promise.all([user.save(), exchange.save()])
       .then( ([ user, exchange ]) => user )

    })
    .catch(err => res.json(err))
     
  })
  .catch(err => res.json(err))
}

UserSchema.statics.removeWishList = (exchangeId, listId, userId) => {
  
  const Exchange = mongoose.model('exchange');
  const User =  mongoose.model('user');

  return Exchange.findById(exchangeId).then(exchange => {
    return User.findById(userId).then(user => {
      exchange.wish_list_ids.pull(listId);
      user.owned_lists.pull(listId);


      return Promise.all([exchange.save(), user.save()])
       .then(([ user, exchange]) => user );

    }).catch(err => res.json(err))

  })
  .catch(err => res.json(err))
}

UserSchema.statics.deleteWishList = (listId, userId) => {

  const User = mongoose.model('user');

  return User.findById(userId).then(user => {
    user.owned_lists.pull(listId);
    return user.save().then(user => user);
  }).catch(err => res.json(err))
  
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
  return User.findById(userId).populate("hosted_exchanges").then(user => {
    return user.hosted_exchanges
  })
}

UserSchema.statics.fetchParticipatedExchanges = (userId) => {
  const User = mongoose.model('user');
  return User.findById(userId).populate("participated_exchanges").then(user => {
    return user.participated_exchanges
  })
}

UserSchema.statics.fetchOwnedLists = (userId) => {
  const User = mongoose.model('user');
  return User.findById(userId).populate("owned_lists").then(user => {
    return user.owned_lists
  })
}



module.exports = mongoose.model("user", UserSchema);
