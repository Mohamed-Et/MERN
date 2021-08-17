const SubCategory = require("../models/subCategory");
const WorkingGroup = require("../models/WorkingGroup");
const Category = require("../models/Category");
const puppeteer = require("puppeteer");
const path = require("path");
const fse = require('fs-extra');
const { Mongoose } = require("mongoose");

// find ALL categories
exports.getAll = (req, res) => {
  SubCategory.find()
    .populate("task")
    .populate("monitoring")
    .populate("documentation")
    .then((subCategories) => {
      if (subCategories.length == 0) {
        return res.status(200).json({ error: "sub_categories_not_found !" });
      } else {
        return res.status(200).json(subCategories);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};
//add category
exports.add = (req, res) => {

  const workingGroup = new WorkingGroup({
    userFacilitator: "Space Admin",
    userWorkers: "Space Admin",
  });

  workingGroup.save().then((data) => {
    const subCategory = new SubCategory({
      order: req.body.order,
      title: req.body.title,
      description: req.body.description,
      deadLine: req.body.deadLine,
      implementation: req.body.implementation,
      workingGroup: data._id
    });
    subCategory
      .save()
      .then(() => res.status(201).json({ message: "sub_category_added" }))
      .catch((error) => res.status(400).json({ error }));
  })

};

exports.getById = (req, res) => {
  id_sub = req.params.id;
  SubCategory.findOne({ _id: id_sub })
    .populate("task")
    .populate("monitoring")
    .populate({
      path: 'documentation',
      populate: {
        path: 'files',
        model: 'DocumentFile'
      }
    })
    .populate("meeting")
    .populate("workingGroup")
    .then((subCategories) => {
      if (!subCategories) {
        return res.status(200).json({ error: "sub_categories_not_found !" });
      } else {
        return res.status(200).json(subCategories);
      }
    })
    .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};

exports.update = (req, res) => {
  id = req.params.id;
  SubCategory.findByIdAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  ).then((subCategory) => {
    if (!subCategory) {
      return res.status(400).json({ error: "sub_category_not_found !" });
    } else {
      return res.status(200).json(subCategory);
    }
  });
};

exports.delete = function (req, res) {

  /* SubCategory.findByIdAndRemove(idSub).then((a) => {
    if (!a) {
      Category.findOneAndUpdate({ _id: idCat }, { $pull: { subCategory: { _id: idSub } } }, { new: true })
      return res.status(400).json({ error: { idCat, idSub } });
    } else {
      Category.findByIdAndUpdate(idCat, { $pull: { subCategory: { _id: idSub } } }, { new: true })
      return res.status(200).json(subCategory);
    }
  }); */

  Category.findOne({ _id: req.params.idCat }).then((a) => {
    if (!a) {
      return res.status(400).json({ error: "not found" });
    } else {
      a.subCategory.pull(req.params.idSub);
      a.save();
      SubCategory.findByIdAndRemove(req.params.idSub).then((sub) => {
        if (sub) {
          return res.status(200).json(a);
        }
        else {
          return res.status(404).json({ error: "not found" });
        }
      })

    }
  })
};
exports.generatePDF = (req, res) => {
  //creating table task
  const createRowTast = (task) => `
        <tr>
            <td>${task.title}</td>
            <td>${task.deliverable}</td>
            <td>${task.deadline}</td></tr>
        `;
  const createTableTask = (rows) => `
        <table>
            <tr>
                    <th>Title</td>
                    <th>Deliverable</td>
                    <th>Deadline</td>
            </tr>
            ${rows}
        </table>
        `;
  //creating table meetings
  const createRowMeeting = (meeting) => `
        <tr>
            <td>${meeting.title}</td>
            <td>${meeting.meeting_date}</td>
        `;
  const createTableMeeting = (rows) => `
        <table>
            <tr>
                    <th>Title</td>
                    <th>Date</td>
            </tr>
            ${rows}
        </table>
        `;
  //creating table monitoring
  const createRowMonitoring = (monitoring) => `
        <tr>
            <td>${monitoring.information}</td>
            <td>${monitoring.author}</td>
            <td>${monitoring.date_monitoring}</td>
        `;
  const createTableMonitoring = (rows) => `
        <table>
            <tr>
                    <th>Information</td>
                    <th>Author</td>
                    <th>Date</td>
            </tr>
            ${rows}
        </table>
        `;
  
  
  
  
  
  const createHtml = (tasksTable, meetingsTable, monitoringTable, num, title, category, deadLine, implementation, description) => `
        <html>
            <head>
            <style>
                html {
                    -webkit-print-color-adjust: exact;
                    }
                body {
                    margin: 0;
                    font-family: sans-serif;
                    font-weight: 100;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th,td {
                    padding: 15px;
                    background-color: #a0d2eb;
                    color: #fff;
                }
                th {
                    text-align: left;
                    background-color: #494D5F;
                }
                .container{
                  
                }
                h2{
                      color: #494D5F;
                }
            </style>
            </head>
            <body>
                <h3>Fiche-Réform Numero ${num}</h2>
                <h1>${title}</h2>
                <div class="container">
                  <p>Category : <span>${category}</span></p>
                  <p>Deadline : <span>${deadLine}</span></p>
                  <p>Implementation progress : <span>${implementation}</span></p>
                </div>
                <h2>Description</h2>
                <div>
                ${description}
                </div>
                <h2>Tasks</h2>
                ${tasksTable}
                <h2>Meetings</h2>
                ${meetingsTable}
                <h2>Monitoring</h2>
                ${monitoringTable}
            </body>
        </html>
        `;

  id_sub = req.params.idSub;
  SubCategory.findOne({ _id: id_sub })
    .populate("task")
    .populate("monitoring")
    .populate("meeting")
    .then((subCategories) => {
      /* generate rows task*/
      const rowsTask = subCategories.task.map(createRowTast).join('');
      /* generate table task*/
      const tableTask = createTableTask(rowsTask);
      /* generate rows meeting*/
      const rowsMeeting = subCategories.meeting.map(createRowMeeting).join('');
      /* generate table meeting*/
      const tableMeeting = createTableMeeting(rowsMeeting);
      /* generate rows monitoring*/
      const rowsMonitoring = subCategories.monitoring.map(createRowMonitoring).join('');
      /* generate table monitoring*/
      const tableMonitoring = createTableMonitoring(rowsMonitoring);
      /* generate html */
      const html = createHtml(tableTask, tableMeeting, tableMonitoring, subCategories.order, subCategories.title, subCategories.category, subCategories.deadLine, subCategories.implementation , subCategories.description);
      /* write the generated html to file */
      fse.writeFileSync(path.resolve("views/subCatHTML.html"), html);
    });

  const printPdf = async () => {
    const htmlFile = path.resolve("views/subCatHTML.html");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("file://" + htmlFile, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      printBackground: true,
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        left: '20px'
      }
    });
    await browser.close();
    console.log('Ending: Generating PDF Process');
    return pdf;
  };

  const init = async () => {
    try {
      const pdf = await printPdf();
      //fse.writeFileSync(path.resolve("public/pdf/demo.pdf"), pdf);
      console.log('Succesfully created an PDF table');
      res.status(201).set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
      res.send(pdf);
    } catch (error) {
      console.log('Error generating PDF', error);
    }

  };
  init();
}
