const express = require("express");
const router = express.Router();
const subCategoryCtrl = require("../controllers/subCategoryController");
const check_id = require("../middleware/check-id");
router.get("/", subCategoryCtrl.getAll);
router.post("/", subCategoryCtrl.add);
router.get("/:id", subCategoryCtrl.getById);
router.patch("/:id", subCategoryCtrl.update);
router.delete("/:idCat/:idSub", subCategoryCtrl.delete);
router.get("/htmlToPdf/:idSub", subCategoryCtrl.generatePDF);


module.exports = router;
