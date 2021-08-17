const Meeting = require("../models/meeting");
const subCategory = require("../models/subCategory");

exports.getAll = (req, res) => {
  Meeting.find()
    .populate("tasks")
    .then((meeting) => {
      if (meeting.length == 0) {
        return res.status(200).json({ error: "meeting_not_found !" });
      } else {
        return res.status(200).json(meeting);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Meeting.findById({ _id: id })
    .populate("tasks")
    .then((meeting) => {
      if (meeting.length == 0) {
        return res.status(200).json({ error: "meeting_not_found !" });
      } else {
        return res.status(200).json(meeting);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};
//add meeting
exports.add = (req, res) => {
  const meeting = new Meeting({
    title: req.body.title,
    description: req.body.description,
    participants: req.body.participants,
    meeting_date: req.body.meeting_date,
    tasks: req.body.tasks,
  });
  meeting
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ error }));
};

exports.addMeeting = (req, res) => {
  var id_subCat = req.params.id_subCategory;
  const meeting = new Meeting({
    title: req.body.title,
    description: req.body.description,
    participants: req.body.participants,
    meeting_date: req.body.meeting_date,
    tasks: req.body.tasks,
  });

  meeting
    .save()
    .then((data) => {
      if (!data) {
        return res.status(400).json({ error: "Error sub" });
      } else {
        subCategory
          .findByIdAndUpdate(
            { _id: id_subCat },
            { $push: { meeting: data._id } }

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

exports.removeById = function (req, res) {

  subCategory.findOne({ _id: req.params.idSub }).then((a) => {
    if (!a) {
      return res.status(404).json({ error: "not found" });
    } else {
      a.meeting.pull(req.params.idMee);
      a.save();

      Meeting.findByIdAndRemove(req.params.idMee).then((meeting) => {
        if (!meeting) {
          return res.status(400).json({ error: "meeting_not_found !" });
        } else {
          return res.status(200).json(meeting);
        }
      });
    }
  })

};

exports.update = (req, res) => {
  id = req.params.id;
  Meeting.findByIdAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  ).then((data) => {
    if (!data) {
      return res.status(400).json({ error: "meeting_not_found !" });
    } else {
      Meeting.findById(data._id).then((meeting) => {
        return res.status(201).json(meeting);
      });
    }
  });
};
