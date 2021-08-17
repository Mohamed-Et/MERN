const express = require("express");
const router = express.Router();
const spaceCtrl = require("../controllers/spaceController");
const check_id = require("../middleware/check-id");
router.get("/", spaceCtrl.getAll);
router.get("/:name", spaceCtrl.getByName);
router.post("/", spaceCtrl.add);
router.patch("/:id", check_id, spaceCtrl.update);
router.delete("/:id", check_id, spaceCtrl.delete);

module.exports = router;
