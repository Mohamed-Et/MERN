const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const userCtrl = require("../controllers/user");
const checkid = require("../middleware/check-id");
const multerConfig = require("../middleware/multer-config");

router.post("/signup", multerConfig, userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.removeById);
router.patch("/:id", userCtrl.update);
router.patch("/password/:email", userCtrl.changePassword);
router.post("/r/:role", userCtrl.addRole);
router.post("/r", userCtrl.addRoleToUser);
router.get("/currentUser", userCtrl.currentUser);
router.get("/r/:id", userCtrl.getUsersByRole);
router.get("/s/:name", userCtrl.getUsersBySpace);
router.get("/", userCtrl.getAll);

router.post("/changePassword", userCtrl.changePsw);

module.exports = router;
