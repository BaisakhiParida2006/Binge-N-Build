const express = require("express");

const router = express.Router();

const protect = require("../middle/authmiddle");

const {

    getDashboard

} = require("../controller/dashboardcontrol");

router.get("/", protect, getDashboard);

module.exports = router;