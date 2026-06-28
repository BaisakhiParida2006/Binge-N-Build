const express = require("express");

const router = express.Router();

const protect = require("../middle/authmiddle");

const {

    detectSubscriptions,

    getSubscriptions

} = require("../controller/subscriptcontrol");

router.get("/detect", protect, detectSubscriptions);

router.get("/", protect, getSubscriptions);

module.exports = router;