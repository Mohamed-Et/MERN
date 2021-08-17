const Document = require("../models/Document");
const subCategory = require("../models/subCategory");
const DocFile = require("../models/document_file");
const fse = require('fs-extra');

exports.getAll = (req, res) => {
    Document.find()
        .populate("files")
        .then((documents) => {
            if (documents.length == 0) {
                return res.status(200).json({ error: "documentss_not_found !" });
            } else {
                return res.status(200).json(documents);
            }
        })
        .catch((error) => res.status(400).json({ error: "table_not_exist" }));
};
//add document
exports.add = (req, res) => {

        const file = new DocFile({
                url: "/documents/" + req.file.filename 
        });
    file
    .save()
    .then((file) => {
        const document = new Document({
            title: req.body.title,
            desc: req.body.desc,
            date: req.body.date,
            files: file._id
        });
        document
            .save()
            .then((data) => res.status(201).json(data))
            .catch((error) => res.status(400).json({ error }));
    });
};

exports.addDocument = (req, res) => {
    var id_subCat = req.params.id_subCategory;
    const ids = [];

    /*
    var myCallback = function (data) {
        data.save();
    };

    var usingItNow = function (callback) {
        req.files.map((fileMap) => {

            const file = new DocFile({
                url: "/documents/" + fileMap.filename
            });

            ids.push(file._id);

            //file.save();
            callback(file);
        });
    };
    usingItNow(myCallback);
    */

    
    req.files.map((fileMap) =>{

        const file = new DocFile({
            url: "/documents/" + fileMap.filename 
        }); 

        ids.push(file._id);

        file.save();
    });
    
    const document = new Document({
        title: req.body.title,
        desc: req.body.desc,
        date: req.body.date,
        files: ids
    });
    document
        .save()
        .then((data) => {
            if (!data) {
                return res.status(400).json({ error: "Error sub" });
            } else {
                subCategory
                    .findByIdAndUpdate({ _id: id_subCat }, { $push: { documentation: data._id } })
                    .populate("files")
                    .then((subCategory) => {
                        if (!subCategory) {
                            return res.status(400).json({ error: "Error subCat" });
                        } else {
                            Document
                                .findById(data._id)
                                .populate("files")
                                .then((docu)=>{
                                    if(!docu){
                                        return res.status(400).json({ error: "Error doc" });
                                    }else{
                                        return res.status(200).json(docu);
                                    }
                                })
                        }
                    });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.removeById = function (req, res) {
    id = req.params.id;
    Document
        .findById({ _id: id })
        .populate("files")
        .then((doc) => {
            doc.files.map((file)=>{
                fse.unlink(`public${file.url}`);
                DocFile
                    .findByIdAndDelete(file._id)
                    .then((docfile)=>{
                        if (!docfile) {
                            //return res.status(400).json({ error: "document_not_found !" });
                            console.log('no docfile found')
                        } else {
                            //return res.status(200).json(document);
                            console.log(docfile);
        }
                    })
            })
    }); 
    Document
    .findByIdAndRemove(id)
    .then((document) => {
        if (!document) {
            return res.status(400).json({ error: "document_not_found !" });
        } else {
            return res.status(200).json(document);
        }
    });
};

exports.removeFileById = function (req, res){
    id = req.params.idFile;
    DocFile
    .findByIdAndDelete(id)
    .then((file)=>{
        if (!file) {
            return res.status(400).json({ error: "file_not_found !" });
        } else {
            return res.status(200).json(file);
        }
    });
};

exports.update = (req, res) => {
    id = req.params.id;

    Document
        .findById({ _id: id })
        .populate("files")
        .then((doc) =>{
            const ids = [];
            doc.files.map((file)=>{
                ids.push(file._id);
            });
            req.files.map((fileMap) => {
                const file = new DocFile({
                    url: "/documents/" + fileMap.filename
                });
                ids.push(file._id);
                file.save();
            })
            Document
                .findByIdAndUpdate({ _id: id },
                    {
                        $set:
                        {
                            'title': req.body.title,
                            'desc': req.body.desc,
                            'date': req.body.date,
                            'files': ids
                        }
                    }
                    ,
                    { new: true }
                )
                .then(
                    (data) => {
                        if (!data) {
                            return res.status(400).json({ error: "document_not_found !" });
                        } else {
                            Document
                                .findById(data._id)
                                .then((document) => {
                                    return res.status(201).json(document);
                                });
                        }
                    }
                );
        });
};
