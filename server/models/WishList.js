const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishListSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  shipping_address: {
    type: String,
    equired: true
  },
  santa_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  exchange_id: {
    type: Schema.Types.ObjectId,
    ref: "exchange"
  },
  item_ids: [{
    type: Schema.Types.ObjectId,
    ref: "item"
  }]
})

WishListSchema.statics.findItems = (wishListId) => {
  const WishList = mongoose.model("wish_list");
  return WishList.findById(wishListId)
    .populate("item_ids").then(wishList => wishList.item_ids)
};

module.exports = mongoose.model("wish_list", WishListSchema);