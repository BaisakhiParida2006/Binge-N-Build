const fs = require("fs");
const csv = require("csv-parser");

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {

        const transactions = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                transactions.push(row);
            })
            .on("end", () => {
                resolve(transactions);
            })
            .on("error", (error) => {
                reject(error);
            });

    });
};

module.exports = parseCSV;