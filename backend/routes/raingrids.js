const express = require("express");

const raingridsController = require("../controllers/raingrids");

const router = express.Router();

router.get("/raingrids", raingridsController.getRaingrids);
router.post("/pointvalue", raingridsController.setPointValue);

module.exports = router;
