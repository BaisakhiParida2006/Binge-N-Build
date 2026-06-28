const express = require("express");

const router = express.Router();

const protect = require("../middle/authmiddle");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controller/transactioncontroller");

router.post("/", protect, addTransaction);

router.get("/", protect, getTransactions);

router.delete("/:id", protect, deleteTransaction);

module.exports = router;