const mongoose = require("mongoose");

const warningSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    merchant: {
        type: String,
        required: true
    },

    warningType: {
        type: String,
        enum: [
            "Price Increase",
            "Duplicate Charge",
            "Forgotten Subscription",
            "Suspicious Merchant"
        ],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    severity: {
        type: String,
        enum: ["Low","Medium","High"],
        default: "Medium"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Warning", warningSchema);