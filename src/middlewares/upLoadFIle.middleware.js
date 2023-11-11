const multer = require('multer');
const path = require('path');
require("dotenv").config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("check req:", req);
        // console.log("check cb:", cb);
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
})

const upload = multer({ storage: storage })

module.exports = upload;