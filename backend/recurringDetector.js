const Transaction = require("../model/transaction");

const detectRecurring = async (userId) => {

    const transactions = await Transaction.find({ user: userId });

    const merchantMap = {};

    transactions.forEach((transaction) => {

        const merchant = transaction.cleanedMerchant;

        if (!merchantMap[merchant]) {

            merchantMap[merchant] = [];

        }

        merchantMap[merchant].push(transaction);

    });

    const subscriptions = [];

    for (const merchant in merchantMap) {

        if (merchantMap[merchant].length >= 2) {

            subscriptions.push({

                merchant,

                amount: merchantMap[merchant][0].amount,

                frequency: "Monthly",

                lastChargeDate:
                    merchantMap[merchant][merchantMap[merchant].length - 1]
                        .transactionDate,

                category: merchantMap[merchant][0].category,

            });

        }

    }

    return subscriptions;

};

module.exports = detectRecurring;