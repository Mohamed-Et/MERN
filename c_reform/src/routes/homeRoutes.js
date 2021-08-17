const express = require("express");
const router = express.Router();
const homeCtrl = require("../controllers/homeController");
const check_id = require("../middleware/check-id");
router.get("/", homeCtrl.get);
router.post("/", homeCtrl.add);
router.patch("/", homeCtrl.update);

module.exports = router;
