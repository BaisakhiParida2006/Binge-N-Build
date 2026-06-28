const Transaction = require("../model/transaction");

const detectFraud = async(userId)=>{

    const transactions = await Transaction.find({
        user:userId
    });

    const warnings = [];

    transactions.forEach(transaction=>{

        if(transaction.amount > 100000){

            warnings.push({

                merchant:transaction.cleanedMerchant,

                warningType:"Suspicious Merchant",

                description:"Very high transaction amount detected.",

                severity:"High"

            });

        }

    });

    return warnings;

}

module.exports = detectFraud;