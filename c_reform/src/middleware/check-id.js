module.exports = (req, res, next) => {
  // we nedd to check id valid format before  https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id

  id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "id_not_valid" });
  } else {
    next();
  }
};
