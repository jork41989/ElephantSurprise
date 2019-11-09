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
    equired: true
  },
  santa_assigned: {
    type: Boolean,
    default: false
  },
  host_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  participant_ids: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  wish_list_ids: [{
    type: Schema.Types.ObjectId,
    ref: "wish_list"
  }]
})

ExchangeSchema.statics.findParticipants = (exchangeId) => {
  const Exchange = mongoose.model("exchange");
  return Exchange.findById(exchangeId)
    .populate("participant_ids").then(exchange => exchange.participant_ids)
};

ExchangeSchema.statics.findWishLists = (exchangeId) => {
  const Exchange = mongoose.model("exchange");
  return Exchange.findById(exchangeId)
    .populate("wish_list_ids").then(exchange => exchange.wish_list_ids)
};

module.exports = mongoose.model("exchange", ExchangeSchema);
