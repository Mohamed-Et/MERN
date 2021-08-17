const express = require("express");
const router = express.Router();
const monitoringCtrl = require("../controllers/monitoringController");
const multerConfig = require("../middleware/multer-config");

router.get("/", monitoringCtrl.getAll);
router.post("/", multerConfig, monitoringCtrl.add);
//read excel file
router.get("/readFile", monitoringCtrl.readFile);
//post file and save its data in the monitoring model
router.post("/postFile", multerConfig, monitoringCtrl.postFile);
router.get("/exportFileExcel/:name", monitoringCtrl.exportFileExcel);
router.get("/exportFilePdf/:name", monitoringCtrl.exportFilePdf);
router.get("/htmlToPdf", monitoringCtrl.htmlToPdf);
router.get("/generateHtml", monitoringCtrl.generateHtml);
//post delete patch for monitoring component
router.delete("/:idSub/:idMon", monitoringCtrl.removeById);
router.post("/:id_subCategory", monitoringCtrl.addMonitoring);
router.patch("/:id", monitoringCtrl.update);

module.exports = router;