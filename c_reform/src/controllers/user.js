const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Role = require("../models/Role");
const Space = require("../models/Space");

require("dotenv").config();
const nodemailer = require("nodemailer");

// step 1
// transporter : connect to host, domaine, service

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    tls: { rejectUnauthorized: false },
  },
});

//register function
exports.signup = (req, res, next) => {
  if (req.body.spaces == "") {
    req.body.spaces = "user";
  }

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: hash,
        spaces: req.body.spaces,
        roles: req.body.roles,
        avatar: "/avatar/default.png",
      });

      let mailOptions = {
        from: "tuuhami@gmail.com",
        to: `${req.body.email}`,
        subject: "Test and Testing",
        text: `Bonjour ${req.body.nom} ${req.body.prenom}`,
        html: `
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <style>
      /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */
      
      /*All the styling goes here*/
      
      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%; 
      }

      body {
        background-color: #f6f6f6;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%; 
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%; }
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top; 
      }

      /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #f6f6f6;
        width: 100%; 
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px; 
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 580px;
        padding: 10px; 
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%; 
      }

      .wrapper {
        box-sizing: border-box;
        padding: 20px; 
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      .footer {
        clear: both;
        margin-top: 10px;
        text-align: center;
        width: 100%; 
      }
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #999999;
          font-size: 12px;
          text-align: center; 
      }

      /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
      h1,
      h2,
      h3,
      h4 {
        color: #000000;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px; 
      }

      h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize; 
      }

      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 15px; 
      }
        p li,
        ul li,
        ol li {
          list-style-position: inside;
          margin-left: 5px; 
      }

      a {
        color: #3498db;
        text-decoration: underline; 
      }

      /* -------------------------------------
          BUTTONS
      ------------------------------------- */
      .btn {
        box-sizing: border-box;
        width: 100%; }
        .btn > tbody > tr > td {
          padding-bottom: 15px; }
        .btn table {
          width: auto; 
      }
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center; 
      }
        .btn a {
          background-color: #ffffff;
          border: solid 1px #3498db;
          border-radius: 5px;
          box-sizing: border-box;
          color: #3498db;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
          text-transform: capitalize; 
      }

      .btn-primary table td {
        background-color: #3498db; 
      }

      .btn-primary a {
        background-color: #3498db;
        border-color: #3498db;
        color: #ffffff; 
      }

      /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
      .last {
        margin-bottom: 0; 
      }

      .first {
        margin-top: 0; 
      }

      .align-center {
        text-align: center; 
      }

      .align-right {
        text-align: right; 
      }

      .align-left {
        text-align: left; 
      }

      .clear {
        clear: both; 
      }

      .mt0 {
        margin-top: 0; 
      }

      .mb0 {
        margin-bottom: 0; 
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0; 
      }

      .powered-by a {
        text-decoration: none; 
      }

      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        margin: 20px 0; 
      }

      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important; 
        }
        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
          font-size: 16px !important; 
        }
        table[class=body] .wrapper,
        table[class=body] .article {
          padding: 10px !important; 
        }
        table[class=body] .content {
          padding: 0 !important; 
        }
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important; 
        }
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important; 
        }
        table[class=body] .btn table {
          width: 100% !important; 
        }
        table[class=body] .btn a {
          width: 100% !important; 
        }
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important; 
        }
      }

      /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%; 
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%; 
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important; 
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
        .btn-primary table td:hover {
          background-color: #34495e !important; 
        }
        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important; 
        } 
      }

    </style>
  </head>
  <body class="">
    <span class="preheader"></span>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">

            <!-- START CENTERED WHITE CONTAINER -->
            <table role="presentation" class="main">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p>Hi ${req.body.nom} ${req.body.prenom}</p>
                        <p>${req.body.spaces} admin has added you to reform system to log, please click in the Button Link below</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                          <tbody>
                            <tr>
                              <td align="left">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td> <a href="http://localhost:3000/firstTimeLogin?email=${req.body.email}&password=${hash}" target="_blank">Link</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>you credentials are :</p>
                        <p>E-mail: ${req.body.email}</p>
                        <p>Password : ${req.body.password}</p>
                        <p>Please Change them</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- END CENTERED WHITE CONTAINER -->

          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>`,
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Email sent !!!");
        }

        transporter.close();
      });
      user
        .save()
        .then((data) => {
          User.findById(data._id)
            .populate("roles")
            .populate("spaces")
            .then((user) => {
              res.status(201).json(user);
            });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(400).json(error));
};
//get all users --testing
exports.getAll = (req, res) => {
  User.find()
    .populate("roles")
    .populate("spaces")
    .then((users) => {
      if (!users) {
        return res.status(400).json({ error: "user_not_found !" });
      } else {
        users.forEach((user) => {
          user.avatar = req.protocol + "://" + req.get("host") + user.avatar;
        });
        return res.json(users);
      }
    });
};

//get current user
exports.currentUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_6567567HGfGF---");
  const userId = decodedToken.userId;

  User.findById(userId)
    .populate("roles")
    .populate("spaces")
    .then((user) => {
      if (user.avatar !== "") {
        user.avatar =
          req.protocol + "://" + req.get("host") + "/avatar/default.png";
      }
      return res.status(200).json(user);
    });
};

//login fonction
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .populate("roles")
    .populate("spaces")
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "user_not_found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(400).json({ error: "incorrect_password" });
          }
          //check avatar if not exist add default

          if (user.avatar !== "") {
            user.avatar =
              req.protocol + "://" + req.get("host") + "/avatar/default.png";
          }
          res.status(200).json({
            userId: user._id,
            email: user.email,
            spaces: user.spaces,
            roles: user.roles,
            spaces: user.spaces,
            avatar: user.avatar,
            token: jwt.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET_6567567HGfGF---",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//reset password
exports.reset = (req, res, next) => {
  return res.status(200).json();
};

exports.removeById = function (req, res) {
  id = req.params.id;
  User.findByIdAndRemove(id).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "user_not_found !" });
    } else {
      return res.status(200).json(user);
    }
  });
};

//remove user
exports.removeByEmail = function (req, res) {
  User.findByIdAndRemove(req.params.email, function (err) {
    if (err) res.status(200).json({ error: "can't delete user" });
    else
      res
        .status(200)
        .json({ message: "user" + req.params.email + "deleted !" });
  });
};

// add role 5ef1c77c6328ab139ccf024c
exports.addRole = function (req, res) {
  const role = new Role({
    role: req.params.role,
  });
  role
    .save()
    .then(() => res.status(201).json({ message: "role_added" }))
    .catch((error) => res.status(400).json({ error }));
};

//add role to user
exports.addRoleToUser = function (req, res) {
  userId = req.body.userId;
  role = req.body.role;
  // find by document id and update and push item in array
  User.findByIdAndUpdate(
    userId,
    { $push: { roles: role } },
    { safe: true, upsert: true },
    function (err, user) {
      if (err) {
        res.status(400).json({ error: "can't_add_role_to_user" });
      } else {
        console.log(user);
        res.status(201).json({ message: "role_added_to_user" });
      }
    }
  );
};

exports.getUsersByRole = function (req, res) {
  role = req.params.id;
  var ObjectId = require("mongodb").ObjectId;
  User.find({ roles: ObjectId(role) })
    .select("nom , prenom , email , roles , avatar")
    .populate("roles")
    .exec()
    .then((users) => {
      if (users.length == 0) {
        return res.status(200).json({ error: "user_not_found !" });
      } else {
        users.forEach((user) => {
          user.avatar = req.protocol + "://" + req.get("host") + user.avatar;
        });
        return res.status(200).json(users);
      }
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getUsersBySpace = function (req, res) {
  name = req.params.name;
  Space.findOne({ name: name }).then((data) => {
    var ObjectId = require("mongodb").ObjectId;
    User.find({ spaces: ObjectId(data._id) })
      .select("nom , prenom , email , roles , avatar")
      .populate("spaces")
      .exec()
      .then((users) => {
        if (users.length == 0) {
          return res.status(200).json({ error: "user_don't_have_space !" });
        } else {
          users.forEach((user) => {
            user.avatar = req.protocol + "://" + req.get("host") + user.avatar;
          });
          return res.status(200).json(users);
        }
      })
      .catch((error) => res.status(400).json({ error: error }));
  });
};

exports.update = (req, res) => {
  id = req.params.id;
  User.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true }).then(
    (data) => {
      if (!data) {
        return res.status(400).json({ error: "user_not_found !" });
      } else {
        User.findById(data._id)
          .populate("roles")
          .populate("spaces")
          .then((user) => {
            return res.status(201).json(user);
          });
      }
    }
  );
};

exports.changePassword = (req, res) => {
  emailId = req.params.email;

  if (req.body.password === req.body.confirmPassword) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.findOneAndUpdate(
        { email: emailId },
        { $set: { password: hash } },
        { new: true }
      ).then((data) => {
        if (!data) {
          return res.status(400).json({ error: "user_not_found !" });
        } else {
          User.findById(data._id)
            .populate("roles")
            .populate("spaces")
            .then((user) => {
              return res.status(201).json(user);
            });
        }
      });
    });
  } else {
    return res.status(400).json({ message: "Mot de passe non conforme" });
  }
};

/* exports.update = (req, res) => {
  email = req.body.email;
  User.updateOne({ email: email }, { $set: req.body }, { new: true }).then(
    (user) => {
      if (!user) {
        return res.status(400).json({ error: "user_not_found !" });
      } else {
        return res.json(user);
      }
    }
  );
};
//change password
*/
exports.changePsw = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_6567567HGfGF---");
  const userId = decodedToken.userId;
  
  User.findById(userId)
        .then((user) => {
          bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
              if (!valid) {
                return res.status(400).json({ error: "incorrect_password" });
              }else{
                if (req.body.new_password !== req.body.new_password_confirmation) {
                  return res.status(400).json({message: 'passwords_doent_match!'});
                }
                bcrypt
                  .hash(req.body.new_password, 10)
                  .then((hash) => {
                    User.updateOne({ email: user.email }, { $set: { password: hash} }, { new: true })
                    .then(
                      (user) => {
                        return res.status(201).json({ 
                          message: "password_updated_succesfully" ,
                          user : user
                        });
                      }
                    );
                  })
              }
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
