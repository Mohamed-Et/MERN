const Status = require("../models/status");

// find ALL categories
exports.getAll = (req, res) => {
    console.log("ok category");
    Status.find()
        .then((status) => {
            if (status.length == 0) {
                return res.status(200).json({ error: "status_not_found !" });
            } else {
                return res.status(200).json(status);
            }
        })
        .catch((error) => res.status(400).json({ error: "status_table_not_exist" }));
};
//add category
exports.add = (req, res) => {
    const status = new Status({
        name: req.body.name,
        description: req.body.description,
        bg_color: req.body.bg_color,
    });
    status
        .save()
        .then(() => res.status(201).json({ message: "status_added" }))
        .catch((error) => res.status(400).json({ error }));
};