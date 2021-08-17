const Feasability = require("../models/feasability");

// find ALL categories
exports.getAll = (req, res) => {
    Feasability.find()
        .then((feasabilities) => {
            if (feasabilities.length == 0) {
                return res.status(200).json({ error: "feasability_not_found !" });
            } else {
                return res.status(200).json(feasabilities);
            }
        })
        .catch((error) => res.status(400).json({ error: "feasability_table_not_exist" }));
};
//add category
exports.add = (req, res) => {
    const feasability = new Feasability({
        name: req.body.name,
        description: req.body.description,
        bg_color: req.body.bg_color,
    });
    feasability
        .save()
        .then(() => res.status(201).json({ message: "feasability_added" }))
        .catch((error) => res.status(400).json({ error }));
};