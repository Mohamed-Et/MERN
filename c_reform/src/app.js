//require("dotenv-flow").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("ejs");

// import routes
const userRoutes = require("./routes/user");
const carousselRoutes = require("./routes/carousselRoutes");
const spaceRoutes = require("./routes/spaceRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const feasabilityRoutes = require("./routes/feasabilityRoutes");
const statusRoutes = require("./routes/statusRoutes");
const homeRoutes = require("./routes/homeRoutes");
const workingGroupRoutes = require("./routes/workingGroupRoutes");
const monitoringRoutes = require("./routes/monitoringRoutes");
const taskRoutes = require("./routes/taskRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const documentRoutes = require("./routes/documentRoutes");
const app = express();
//database connection
mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));
mongoose.set("useFindAndModify", false);

//database parse request
app.use(bodyParser.json());

//use ejs for test
app.set("view engine", "ejs");

//database send header to acces cros access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// public images access
app.use(express.static("public"));

//Read data from form
app.use(express.urlencoded({ extended: true }));

//logic user connexion and management
app.use("/user", userRoutes);

//caroussel Routes
app.use("/caroussel", carousselRoutes);
//Space Routes
app.use("/space", spaceRoutes);

app.use("/home", homeRoutes);

//routes for catogies
app.use("/", categoryRoutes);
app.use("/subCategory", subCategoryRoutes);
app.use("/feasability", feasabilityRoutes);
app.use("/status", statusRoutes);
//routes for subcategories (monitoring/workingGroup)
app.use("/workinggroup", workingGroupRoutes);
app.use("/monitoring", monitoringRoutes);
app.use("/task", taskRoutes);
app.use("/meeting", meetingRoutes);
app.use("/document", documentRoutes);
//just for testing EJS
app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
