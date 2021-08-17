const WorkingGroup = require("../models/WorkingGroup");
const subCategory = require("../models/subCategory");
const User = require("../models/User");

exports.getAll = (req, res) => {
  WorkingGroup.find()
    .then((workingGroupes) => {
      if (workingGroupes.length == 0) {
        return res.status(200).json({ error: "workingGroupes_not_found !" });
      } else {
        return res.status(200).json(workingGroupes);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};

//add wrokingGroup
exports.add = (req, res) => {
  const workingGroup = new WorkingGroup({
    userFacilitator: req.body.userFacilitator,
    userWorkers: req.body.userWorkers,
  });
  workingGroup
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ error }));
};

exports.addUserWorker = (req, res) => {
  var id_subCat = req.params.id;
  const workingGroup = new WorkingGroup({
    userFacilitator: req.body.userFacilitator,
    userWorkers: req.body.userWorkers,
  });
  
  workingGroup
    .save()
    .then((data) => {
      if (!data) {
      return res.status(400).json({ error: "Error sub" });
    } else {
      subCategory
        .findByIdAndUpdate(
          { _id: id_subCat },  
          { $set: { workingGroup: data._id } },
          { new: false }
        )
        .then((subCategory) => {
          if (!subCategory) {
            return res.status(400).json({ error: "Error subCat" });
          } else {
            return res.status(200).json(data);
          }
        });
    }
  })
    .catch((error) => res.status(400).json({ error }));
};

exports.update = (req, res) => {
  id = req.params.id;
  WorkingGroup.findByIdAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  ).then((data) => {
    if (!data) {
      return res.status(400).json({ error: "workinggroup_not_found !" });
    } else {
      Meeting.findById(data._id).then((workingGroup) => {
        return res.status(201).json(workingGroup);
      });
    }
  });
};

exports.addUserWorker1 = (req, res) => {
  var id_subCat = req.params.id;
      subCategory
        .findOne(
          { _id: id_subCat }
        )
        .then((SubCategory) => {
          if (!SubCategory) {
            return res.status(400).json({ error: "Error subCat" });
          } else {
            WorkingGroup.findByIdAndUpdate({_id : SubCategory.workingGroup._id}, {$set : req.body}, {new : true}).then((data)=>{
              return res.status(200).json(data);
            })
            
          }
        });
    };
