const Transaction = require("../model/transaction");

const getDashboardAnalytics = async (userId) => {

    const transactions = await Transaction.find({ user: userId });

    let totalExpense = 0;
    let subscriptionExpense = 0;

    const categoryBreakdown = {};

    transactions.forEach((transaction) => {

        totalExpense += transaction.amount;

        if (transaction.isSubscription) {
            subscriptionExpense += transaction.amount;
        }

        if (!categoryBreakdown[transaction.category]) {
            categoryBreakdown[transaction.category] = 0;
        }

        categoryBreakdown[transaction.category] += transaction.amount;

    });

    return {

        totalTransactions: transactions.length,

        totalExpense,

        subscriptionExpense,

        categoryBreakdown

    };

};

module.exports = getDashboardAnalytics;