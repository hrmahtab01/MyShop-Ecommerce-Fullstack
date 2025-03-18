const mongoose = require("mongoose");


const subcriberSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

const subscribeModel = mongoose.model("Subscribe", subcriberSchema);

module.exports = subscribeModel;
