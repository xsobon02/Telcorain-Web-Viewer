const express = require("express");

const influxController = require("../controllers/influx");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/realtimedata", isAuth, influxController.getRealTimeData);

module.exports = router;
