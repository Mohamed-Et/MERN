const Category = require("../models/Category");
const Space = require("../models/Space");
const WorkingGroup = require("../models/WorkingGroup");
const subCategory = require("../models/subCategory");

// find ALL categories
exports.getAll = (req, res) => {
  console.log("ok category");
  Category.find()
    .populate("subCategory")
    .then((categories) => {
      if (categories.length == 0) {
        return res.status(200).json({ error: "categories_not_found !" });
      } else {
        return res.status(200).json(categories);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};
//add category
exports.add = (req, res) => {
  const category = new Category({
    order: req.body.order,
    title: req.body.title,
    description: req.body.description,
    space: req.body.space,
    user: req.body.user,
  });
  category
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ error }));
};

exports.delete = (req, res) => {
  id = req.params.id;
  Category.findByIdAndRemove({ _id: id }).then((category) => {
    if (!category) {
      return res.status(400).json({ error: "category_not_found !" });
    } else {
      return res.status(200).json({ message: "category_deleted" });
    }
  });
};

exports.getBySpaceId = (req, res) => {
  space_id = req.params.id;

  Category.find({ space: space_id }).then((category) => {
    if (!category) {
      return res.status(400).json({ error: "category_not_found !" });
    } else {
      return res.json(category);
    }
  });
};

exports.getBySpaceName = (req, res) => {
  space_name = req.params.name;

  Space.findOne({ name: space_name }).then((space) => {
    if (!space) {
      return res.status(400).json({ error: "spaces_not_found !" });
    } else {
      Category
      .find({ space: space._id })
      .populate("subCategory")
      .then((category) => {
        if (!category) {
          return res.status(400).json({ error: "category_not_found !" });
        } else {
          return res.json(category);
        }
      });
    }
  });
};

exports.addByName = (req, res) => {
  space_name = req.params.name;
  let space_id;
  Space.findOne({ name: space_name }).then((space) => {
    if (!space) {
      return res.status(400).json({ error: "space_not_found !" });
    } else {
      space_id = space._id;
      const category = new Category({
        order: req.body.order,
        title: req.body.title,
        description: req.body.description,
        space: space_id,
        user: req.body.user,
      });
      category
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

exports.update = (req, res) => {
  id = req.params.id;
  Category.findByIdAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  ).then((category) => {
    if (!category) {
      return res.status(400).json({ error: "category_not_found !" });
    } else {
      return res.status(200).json(category);
    }
  });
};

exports.delete = (req, res) => {
  id = req.params.id;
  Category.findByIdAndRemove({ _id: id }).then((category) => {
    if (!category) {
      return res.status(400).json({ error: "category_not_found !" });
    } else {
      return res.status(200).json({ message: "category_deleted" });
    }
  });
};

exports.addSubCategory = (req, res) => {
  var id_cat = req.params.id_category;
  const workingGroup = new WorkingGroup({
    userFacilitator: "Space Admin",
    userWorkers: "Space Admin",
  });

  workingGroup.save().then((data) => {
    const subcategory = new subCategory({
      order: req.body.subOrder,
      title: req.body.subTitle,
      description: req.body.subDescription,
      deadLine: req.body.deadLine,
      category: req.body.category,
      feasibility: req.body.feasibility,
      status: req.body.status,
      implementation: req.body.implementation,
      workingGroup: data._id
    });

    subcategory
      .save()
      .then((data) => {
        if (!data) {
          return res.status(400).json({ error: "Error sub" });
        } else {
          Category.findByIdAndUpdate(
            { _id: id_cat },
            { $push: { subCategory: data._id } }
          ).then((category) => {
            if (!category) {
              return res.status(400).json({ error: "Error cat" });
            } else {
              return res.status(200).json(category);
            }
          });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  })

};

exports.getById = (req, res) => {
  id = req.params.id;
  Category.findById({ _id: id }).populate({
    path: "subCategory",
    populate: {
      path: 'task'
    }
  }).populate({
    path: "subCategory",
    populate: {
      path: 'workingGroup'
    }
  })
    .then((category) => {
      if (category.length == 0) {
        return res.status(200).json({ error: "categories_not_found !" });
      } else {
        return res.status(200).json(category);
      }
    })
    .catch((error) => res.status(400).json({ error: error }));
};
