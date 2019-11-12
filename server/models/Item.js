const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchased: {
    type: Boolean,
    default: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  wish_list: {
    type: Schema.Types.ObjectId,
    ref: "wish_list",
    required: true
  }
})

module.exports = mongoose.model("item", ItemSchema);