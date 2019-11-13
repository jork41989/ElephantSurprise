const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishListSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  shipping_address: {
    type: String,
    required: false
    
  },
  santa: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  exchange: {
    type: Schema.Types.ObjectId,
    ref: "exchange",
    required: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: "item"
  }]
})

WishListSchema.statics.findItems = (wish_ist_id) => {
  const WishList = mongoose.model("wish_list");
  return WishList.findById(wish_ist_id).populate("items")
    .then(wish_list => wish_list.items)
};

module.exports = mongoose.model("wish_list", WishListSchema);