const Caroussel = require("../models/Caroussel");
const fs = require("fs-extra");

exports.add = (req, res) => {
  const caroussel = new Caroussel({
    title: req.body.title,
    description: req.body.description,
    img: "/caroussel/" + req.file.filename,
  });
  caroussel
    .save()
    .then(() => res.status(201).json({ message: "caroussel_added" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAll = (req, res) => {
  Caroussel.find().then((caroussels) => {
    if (!caroussels) {
      return res.status(400).json({ error: "caroussel_not_found !" });
    } else {
      caroussels.forEach((caroussel) => {
        caroussel.img = req.protocol + "://" + req.get("host") + caroussel.img;
      });
      return res.json(caroussels);
    }
  });
};

exports.get = (req, res) => {
  id = req.params.id;

  Caroussel.findById(id).then((caroussel) => {
    if (!caroussel) {
      return res.status(400).json({ error: "caroussel_not_found !" });
    } else {
      return res.json(caroussel);
    }
  });
};

exports.update = (req, res) => {
  id = req.params.id;
  Caroussel.updateOne({ _id: id }, { $set: req.body }, { new: true }).then(
    (caroussel) => {
      if (!caroussel) {
        return res.status(400).json({ error: "caroussel_not_found !" });
      } else {
        return res.json(caroussel);
      }
    }
  );
};

exports.delete = (req, res) => {
  id = req.params.id;
  Caroussel.findByIdAndRemove({ _id: id }).then((caroussel) => {
    if (!caroussel) {
      return res.status(400).json({ error: "caroussel_not_found !" });
    } else {
      fs.remove("public" + caroussel.img, (err) => {
        if (err) return console.error(err);
        console.log("image removed successfully!");
      });
      return res.json({ message: "caroussel_deleted" });
    }
  });
};
