const express = require("express");
const router = express.Router();
const workingGroupCtrl = require("../controllers/workingGroupController");

router.get("/", workingGroupCtrl.getAll);
router.patch("/:id", workingGroupCtrl.addUserWorker1);
router.post("/", workingGroupCtrl.add);

/*
router.patch("/:id", workingGroupCtrl.update);
router.delete("/:id", workingGroupCtrl.delete);
*/

module.exports = router;