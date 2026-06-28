const Transaction = require("../model/transaction");

const generateWarnings = async (userId) => {

    const transactions = await Transaction.find({
        user: userId
    });

    const warnings = [];

    const merchantMap = {};

    transactions.forEach((transaction) => {

        const merchant = transaction.cleanedMerchant;

        if(!merchantMap[merchant]){

            merchantMap[merchant] = [];

        }

        merchantMap[merchant].push(transaction);

    });

    for(const merchant in merchantMap){

        if(merchantMap[merchant].length >= 3){

            warnings.push({

                merchant,

                warningType:"Forgotten Subscription",

                description:`${merchant} has recurring payments. Check if you still use it.`,

                severity:"Medium"

            });

        }

    }

    return warnings;

}

module.exports = generateWarnings;