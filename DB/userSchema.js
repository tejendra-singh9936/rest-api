const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      locality: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      location: {
        type: { type: String, required: true },
        coordinates: [Number],
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("userdetails", userSchema);
module.exports = userModel;
