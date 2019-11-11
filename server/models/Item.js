const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  url: {
    type: String,
    equired: true
  },
  price: {
    type: Number,
    equired: true
  },
  purchased: {
    type: Boolean,
    default: false
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
})

module.exports = mongoose.model("item", ItemSchema);