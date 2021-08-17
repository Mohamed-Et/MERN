const express = require("express");
const router = express.Router();
const carousselCtrl = require("../controllers/carousselController");
const multerConfig = require("../middleware/multer-config");
const check_id = require("../middleware/check-id");
router.get("/", carousselCtrl.getAll);
router.get("/:id", check_id, carousselCtrl.get);
router.post("/", multerConfig, carousselCtrl.add);
router.patch("/:id", check_id, carousselCtrl.update);
router.delete("/:id", check_id, carousselCtrl.delete);

module.exports = router;
