const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/categoryController");
const check_id = require("../middleware/check-id");
router.get("/categories", categoryCtrl.getAll);
router.get("/category/:id", categoryCtrl.getById);
router.post("/category", categoryCtrl.add);
router.get("/s/:name/categories", categoryCtrl.getBySpaceName);
router.patch("/:id", check_id, categoryCtrl.update);
router.delete("/:id", check_id, categoryCtrl.delete);
router.post("/s/:name/categories", categoryCtrl.addByName);
router.patch("/:id_category/subcategory", categoryCtrl.addSubCategory);

module.exports = router;
