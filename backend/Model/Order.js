const mongoose = require("mongoose");

const orderschema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cartitem: [
      {
        productid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
    name: {
      type: String,
      required: true,
    },
    totalprice: {
      type: Number,
    },
    paymentstatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    paymentmethod: {
      type: String,
      enum: ["COD", "online"],
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    trans_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderschema);
module.exports = orderModel;
