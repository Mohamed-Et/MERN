const Home = require("../models/Home");
const carousselCtrl = require("../controllers/carousselController");
const express = require("express");
const router = express.Router();

exports.add = (req, res) => {
  //caroussels undefined

  const { presentation_title, presentation_content } = req.body;

  const home = new Home({
    // problem how to exact data from caroussel
    navBarTitle: req.body.navBarTitle,
    logo_right: "/logo/" + req.body.logo_right,
    logo_left: "/logo/" + req.body.logo_left,
    presentation_title: presentation_title,
    presentation_content: presentation_content,
  });

  home
    .save()
    .then(() => res.status(201).json({ message: "home_added" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.get = (req, res) => {
  Home.findOne().then((home) => {
    if (!home) {
      return res.status(400).json({ error: "home_not_found !" });
    } else {
      return res.json(home);
    }
  });
};

exports.update = (req, res) => {
  id = "5ef210103f384848ac623b11";
  Home.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true }).then(
    (home) => {
      if (!home) {
        return res.status(400).json({ error: "home_not_found !" });
      } else {
        return res.json(home);
      }
    }
  );
};
