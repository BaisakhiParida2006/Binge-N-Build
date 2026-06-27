const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    merchant: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    frequency: {
      type: String,
      enum: ["Weekly", "Monthly", "Quarterly", "Yearly", "Unknown"],
      default: "Unknown",
    },

    lastChargeDate: {
      type: Date,
      required: true,
    },

    nextChargeDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Active", "Cancelled", "Unknown"],
      default: "Active",
    },

    category: {
      type: String,
      default: "Others",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);