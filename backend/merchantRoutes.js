const express = require("express");

const router = express.Router();

const protect = require("../middle/authmiddle");

const {
  cleanMerchantName
} = require("../controller/merchantcontrol");

router.post("/clean", protect, cleanMerchantName);

module.exports = router;