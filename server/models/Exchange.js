const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExchangeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  ship_date: {
    type: Date,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  santa_assigned: {
    type: Boolean,
    default: false
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  wish_lists: [{
    type: Schema.Types.ObjectId,
    ref: "wish_list"
  }]
})

ExchangeSchema.statics.findParticipants = (exchange_id) => {
  const Exchange = mongoose.model("exchange");
  return Exchange.findById(exchange_id).populate("participants")
    .then(exchange => exchange.participants)
};

ExchangeSchema.statics.findWishLists = (exchange_id) => {
  const Exchange = mongoose.model("exchange");
  return Exchange.findById(exchange_id).populate("wish_lists")
    .then(exchange => exchange.wish_lists)
};

module.exports = mongoose.model("exchange", ExchangeSchema);
