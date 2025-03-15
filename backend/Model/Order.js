const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    name: {
      type: String,
      required: tru,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: String,
    color: String,
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItem: [orderItemSchema],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    delivaredAt: {
      type: Date(),
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    status: {
      type: String,
      enum: ["Proccesing", "Shipped", "Delivered", "Cancelled"],
      default: "Proccesing",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
