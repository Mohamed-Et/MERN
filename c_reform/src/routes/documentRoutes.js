const express = require("express");
const router = express.Router();
const documentCtrl = require("../controllers/documentController");
const multerConfig = require("../middleware/multer-config");


router.get("/", documentCtrl.getAll);
router.post("/", multerConfig, documentCtrl.add);
router.delete("/:id",  documentCtrl.removeById);
router.post("/:id_subCategory", multerConfig, documentCtrl.addDocument);
router.patch("/:id", multerConfig, documentCtrl.update);
router.delete("/file/:idFile", documentCtrl.removeFileById);

module.exports = router;