const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

function checkRole(roleToCheck) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(
        token,
        "RANDOM_TOKEN_SECRET_6567567HGfGF---"
      );
      const userId = decodedToken.userId;
      User.findOne({ _id: userId })
        .populate("roles")
        .then((user) => {
          // role objects
          userRoles = user.roles;
          // map objects to array
          arrayRoles = [];
          user.roles.forEach((role) => {
            arrayRoles.push(role.role);
          });
          // check  if roleToCheck exist in UserRole
          result = roleToCheck.some((ele) => arrayRoles.includes(ele));

          if (result) next();
          else res.status(401).json({});
        });
    } catch {
      res.status(401).json({
        error: new Error("Unauthorized"),
      });
    }
  };
}

module.exports = checkRole;

/*other way to do

User.findOne({ _id: userId }).then((user) => {
        if (!user) {
          return res.status(400).json({ error: "user_not_found" });
        }
        user.roles.forEach((role_id) => {
          if (!role_id) {
            return res.status(400).json({ error: "user role not found" });
          }
          Role.findOne({ _id: role_id }).then((object_role) => {
            if (!object_role) {
              return res.status(400).json({ error: "role not found" });
            }
            role.forEach((nom_role) => {
              if (object_role.role === nom_role) {
                next();
              }
              else{
                  return res.status(400).json({error: "role not found"})
              }
            });
          });
        });
      });


*/
