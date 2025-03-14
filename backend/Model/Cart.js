const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    name: String,
    image: String,
    price: String,
    size: String,
    color: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: String,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("cart", cartItemSchema);
module.exports = cartModel;
