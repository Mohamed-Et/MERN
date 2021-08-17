const express = require("express");
const router = express.Router();
const statusCtrl = require("../controllers/statusController");
const checkRole = require("../middleware/checkRole");
const auth = require("../middleware/auth");

router.get("/", auth, checkRole(["super_admin"]), statusCtrl.getAll);
router.post("/", statusCtrl.add);
//router.get("/:id", check_id, carousselCtrl.get);
//router.post("/", multerConfig, carousselCtrl.add);
//router.patch("/:id", check_id, carousselCtrl.update);
//router.delete("/:id", check_id, carousselCtrl.delete);
module.exports = router;
