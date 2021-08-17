const express = require("express");
const router = express.Router();
const meetingCtrl = require("../controllers/meetingController");

router.get("/", meetingCtrl.getAll);
router.get("/:id", meetingCtrl.getById);
router.post("/", meetingCtrl.add);
router.delete("/:idSub/:idMee", meetingCtrl.removeById);
router.post("/:id_subCategory", meetingCtrl.addMeeting);
router.patch("/:id", meetingCtrl.update);

module.exports = router;
