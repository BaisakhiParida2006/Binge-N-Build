const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalMerchant: {
      type: String,
      required: true,
    },

    cleanedMerchant: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
    },

    transactionDate: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      default: "Others",
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Net Banking", "Wallet", "Cash", "Other"],
      default: "Other",
    },

    isSubscription: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);