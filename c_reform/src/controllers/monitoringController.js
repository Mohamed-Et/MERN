const Monitoring = require("../models/Monitoring");
const subCategory = require("../models/subCategory");
const User = require("../models/User");
const XlsxFile = require('read-excel-file/node');
const excel = require('exceljs');
const PDFDocument = require('pdfkit');
const fse = require('fs-extra');
const path = require("path");
const puppeteer = require("puppeteer");


exports.getAll = (req, res) => {
    Monitoring.find()
        .then((Monitorings) => {
            if (Monitorings.length == 0) {
                return res.status(200).json({ error: "Monitorings_not_found !" });
            } else {
                return res.status(200).json(Monitorings);
            }
        })
        .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};


exports.getById = (req, res) => {
    Monitoring.findOne({ _id: req.params.id })
        .populate("users")
        .then((Monitoring) => {
            if (Monitoring.length == 0) {
                return res.status(200).json({ error: "tasks_not_found !" });
            } else {
                return res.status(200).json(Monitoring);
            }
        })
        .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};
//add wrokingGroupe
exports.add = (req, res) => {
    const monitoring = new Monitoring({
        information: req.body.information,
        author: req.body.author,
        date_monitoring: req.body.date_monitoring,
        excel_file: "/excel/" + req.file.filename
    });
    monitoring
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(400).json({ error }));
};
//testing
exports.readFile = (req, res) => {
    XlsxFile('public/excel/excel_file1594922184457.xlsx').then((rows) => {
        rows.forEach((row) => {
            console.log(row[0]);
            console.log(row[1]);
            console.log(row[2]);
            console.log("next row");
        });
    });
};
//read excel file and store its data in database
exports.postFile = (req, res) => {
    monitoringArray = [];
    XlsxFile('public/excel/' + req.file.filename).then((rows) => {
        rows.forEach((row) => {
            if (row[0] === 'information') {
                return;
            }
            const monitoring = {
                information: row[0],
                author: row[1],
                date_monitoring: row[2],
            };
            monitoringArray.push(monitoring);
        });
        Monitoring
            .insertMany(monitoringArray)
            .then((data) => res.status(201).json(data))
            .catch((error) => res.status(400).json({ error }));
    });

};
//export table into excel file
exports.exportFileExcel = (req, res) => {
    name = req.params.name;
    Monitoring
        .find()
        .then((rows) => {
            let workbook = new excel.Workbook(); //creating workbook
            let worksheet = workbook.addWorksheet('Monitoring'); //creating worksheet

            worksheet.columns = [
                { header: 'information', key: 'information', width: 30 },
                { header: 'author', key: 'author', width: 30 },
                { header: 'date_monitoring', key: 'date_monitoring', width: 30 },
            ];

            worksheet.addRows(rows);

            // Write to File
            workbook.xlsx.writeFile(`public/excel/${name}.xlsx`)
                .then(function () {
                    res.status(200).json({
                        message: 'file saved!'
                    })
                });
        });
};

//export table into pdf file
exports.exportFilePdf = (req, res) => {
    name = req.params.name;

    function generateTableRow(doc, y, c1, c2, c3) {
        if (doc.y > 685) {
            doc
                .addPage()
                .fontSize(12)
                .font('Times-Roman')
                .text(c1, 20, y, { widtg: 150 })
                .text(c2, 200, y, { widtg: 100 })
                .text(c3, 350, y, { widtg: 200 });
        } else {
            doc
                .fontSize(12)
                .font('Times-Roman')
                .text(c1, 20, y, { widtg: 150 })
                .text(c2, 200, y, { widtg: 100 })
                .text(c3, 350, y, { widtg: 200 });
        }
    }
    function generateMonitoringTable(doc, rows) {
        let i,
            j = 0,
            rowTop = 150;

        for (i = 0; i < rows.length; i++, j++) {
            const row = rows[i];
            let position = rowTop + (j + 1) * 30;

            generateTableRow(
                doc,
                position,
                row.information,
                row.author,
                row.date_monitoring
            );

            if (doc.y > 716) {
                doc.y = 180;
                j = 0;
                rowTop = 20;
            }
            console.log(`this is doc.y  ${doc.y}`);
            console.log(`this is position  ${position}`);
        }
    }
    //fetch all the rows in monitoring table
    Monitoring
        .find()
        .then((rows) => {
            //instantiate pdfdocument
            const doc = new PDFDocument();
            //create the pdf file in the specified location
            doc.pipe(fse.createWriteStream(`./public/pdf/${name}.pdf`));
            //header
            doc
                .font('Times-Bold')
                .fontSize(30)
                .text(`Monitoring Table`, { align: 'center' })
                .moveDown();
            //generating the table
            generateMonitoringTable(doc, rows);
            //send response
            res.status(200).json({
                message: 'pdf created'
            });
            //close the document
            doc.end();
        });
};
//html to pdf
exports.htmlToPdf = (req, res) => {
    name = req.params.name;

    (async () => {
        const htmlFile = path.resolve("views/generatePDF.html");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("file://" + htmlFile);
        const pdf = await page.pdf({ path: `public/pdf/hello.pdf`, format: "Letter" });
        await browser.close();

        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
        res.send(pdf);
    })();
}
exports.generateHtml = (req, res) => {
    const createRow = (row) => `
        <tr>
            <td>${row.information}</td>
            <td>${row.author}</td>
            <td>${row.date_monitoring}</td>
        </tr>
        `;
    const createTable = (rows) => `
        <table>
            <tr>
                    <th>Informations</td>
                    <th>Author</td>
                    <th>Date</td>
            </tr>
            ${rows}
        </table>
        `;
    const createHtml = (table) => `
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
            </style>
            </head>
            <body>
                ${table}
            </body>
        </html>
        `;

    Monitoring
        .find()
        .then((data) => {
            /* generate rows */
            const rows = data.map(createRow).join('');
            /* generate table */
            const table = createTable(rows);
            /* generate html */
            const html = createHtml(table);
            /* write the generated html to file */
            fse.writeFileSync(path.resolve("views/generatePDF.html"), html);
        })
        .catch((error) => res.status(400).json({ error }));

    const printPdf = async () => {
        const htmlFile = path.resolve("views/generatePDF.html");
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
// add post patch for monitoring component
exports.addMonitoring = (req, res) => {
    var id_subCat = req.params.id_subCategory;
    const monitoring = new Monitoring({
        information: req.body.information,
        author: req.body.author,
        date_monitoring: req.body.date_monitoring,
    });

    monitoring
        .save()
        .then((data) => {
            if (!data) {
                return res.status(400).json({ error: "Error sub" });
            } else {
                subCategory
                    .findByIdAndUpdate({ _id: id_subCat }, { $push: { monitoring: data._id } })
                    .then((subCategory) => {
                        if (!subCategory) {
                            return res.status(400).json({ error: "Error subCat" });
                        } else {
                            return res.status(200).json(data);
                        }
                    });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.removeById = function (req, res) {
    subCategory.findOne({ _id: req.params.idSub }).then((a) => {
        if (!a) {
            return res.status(404).json({ error: "not found" })
        } else {
            a.monitoring.pull(req.params.idMon);
            a.save();
            Monitoring.findByIdAndRemove(req.params.idMon).then((monitoring) => {
                if (!monitoring) {
                    return res.status(400).json({ error: "monitoring_not_found !" });
                } else {
                    return res.status(200).json(monitoring);
                }
            });
        }
    })
};

exports.update = (req, res) => {
    id = req.params.id;
    Monitoring.
        findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        .then(
            (data) => {
                if (!data) {
                    return res.status(400).json({ error: "monitoring_not_found !" });
                } else {
                    Monitoring.findById(data._id)
                        .then((monitoring) => {
                            return res.status(201).json(monitoring);
                        });
                }
            }
        );
};