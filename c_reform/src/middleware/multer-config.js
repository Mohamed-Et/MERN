const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx"
  
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if(file.fieldname === 'avatar'){
      callback(null, "public/avatar");
    }else if(file.fieldname === 'caroussel'){
      callback(null, "public/caroussel");
    }else if (file.fieldname === 'excel_file') {
      callback(null, "public/excel");
    }else if (file.fieldname === 'files'){
      callback(null,"public/documents")
    }
  },
  filename: (req, file, callback) => {
    //replace originalname with fieldName && CCC. with Date.now()
    const name = file.fieldname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name+ Date.now()+ "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("img");
module.exports = multer({ storage: storage }).single("avatar");
module.exports = multer({ storage: storage }).single("excel_file");
//module.exports = multer({ storage: storage }).single("files");
module.exports = multer({ storage: storage}).array('files');

