const express = require("express");
const router = express.Router();
const taskCtrl = require("../controllers/taskController");

router.get("/", taskCtrl.getAll);
router.get("/:id", taskCtrl.getById);
router.post("/", taskCtrl.add);
router.delete("/:idSub/:idTas", taskCtrl.removeById);
router.post("/:id_subCategory", taskCtrl.addTask);
router.patch("/:id", taskCtrl.update);

module.exports = router;
