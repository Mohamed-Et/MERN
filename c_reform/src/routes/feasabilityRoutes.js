const express = require("express");
const router = express.Router();
const feasabilityCtrl = require("../controllers/feasabilityController");
router.get("/", feasabilityCtrl.getAll);
router.post("/", feasabilityCtrl.add);
//router.get("/:id", check_id, carousselCtrl.get);
//router.post("/", multerConfig, carousselCtrl.add);
//router.patch("/:id", check_id, carousselCtrl.update);
//router.delete("/:id", check_id, carousselCtrl.delete);

module.exports = router;
