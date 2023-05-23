const express = require("express");

const linksController = require("../controllers/links");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/reallinks", isAuth, linksController.getRealLinks);
router.get("/fakelinks", linksController.getFakeLinks);

module.exports = router;
