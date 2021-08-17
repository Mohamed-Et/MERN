const Task = require("../models/Task");
const subCategory = require("../models/subCategory");

exports.getAll = (req, res) => {
  Task.find()
    .populate("users")
    .then((Tasks) => {
      if (Tasks.length == 0) {
        return res.status(200).json({ error: "tasks_not_found !" });
      } else {
        return res.status(200).json(Tasks);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};
//add task
exports.add = (req, res) => {
  const task = new Task({
    title: req.body.title,
    deliverable: req.body.deliverable,
    deadline: req.body.deadline,
    implementation: req.body.implementation,
    personInCharge: req.body.personInCharge,
    description: req.body.description,
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate,
  });
  task
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ error }));
};

exports.addTask = (req, res) => {
  var id_subCat = req.params.id_subCategory;
  const task = new Task({
    title: req.body.title,
    deliverable: req.body.deliverable,
    deadline: req.body.deadline,
    implementation: req.body.implementation,
    personInCharge: req.body.personInCharge,
    description: req.body.description,
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate,
  });

  task
    .save()
    .then((data) => {
      if (!data) {
        return res.status(400).json({ error: "Error sub" });
      } else {
        subCategory
          .findByIdAndUpdate({ _id: id_subCat }, { $push: { task: data._id } })
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

exports.removeById = function (req, res) {

  subCategory.findOne({ _id: req.params.idSub }).then((a) => {
    if (!a) {
      return res.status(404).json({ error: "not found" });
    } else {
      a.task.pull(req.params.idTas);
      a.save();
      Task.findByIdAndRemove(req.params.idTas).then((task) => {
        if (!task) {
          return res.status(400).json({ error: "task_not_found !" });
        } else {
          return res.status(200).json(task);
        }
      });
    }
  })

};

exports.update = (req, res) => {
  id = req.params.id;
  Task.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true }).then(
    (data) => {
      if (!data) {
        return res.status(400).json({ error: "task_not_found !" });
      } else {
        Task.findById(data._id).then((task) => {
          return res.status(201).json(task);
        });
      }
    }
  );
};

exports.getById = (req, res) => {
  Task.findOne({ _id: req.params.id })
    .populate("users")
    .then((Tasks) => {
      if (Tasks.length == 0) {
        return res.status(200).json({ error: "tasks_not_found !" });
      } else {
        return res.status(200).json(Tasks);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};