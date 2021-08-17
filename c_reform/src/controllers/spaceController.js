const Space = require("../models/Space");

exports.add = (req, res) => {
  const space = new Space({
    name: req.body.name,
    logo_text: req.body.logo_text,
  });
  space
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAll = (req, res) => {
  Space.find().then((spaces) => {
    if (!spaces) {
      return res.status(400).json({ error: "space_not_found !" });
    } else {
      return res.json(spaces);
    }
  });
};

exports.getByName = (req, res) => {
  name = req.params.name;

  Space.findOne({ name: name }).then((space) => {
    if (!space) {
      return res.status(400).json({ error: "space_not_found !" });
    } else {
      return res.json(space);
    }
  });
};

exports.update = (req, res) => {
  id = req.params.id;
  Space.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true }).then(
    (space) => {
      if (!space) {
        return res.status(400).json({ error: "space_not_found !" });
      } else {
        return res.status(200).json(space);
      }
    }
  );
};

exports.delete = (req, res) => {
  id = req.params.id;
  Space.findByIdAndRemove({ _id: id }).then((space) => {
    if (!space) {
      return res.status(400).json({ error: "space_not_found !" });
    } else {
      return res.status(200).json({ message: "space_deleted" });
    }
  });
};
