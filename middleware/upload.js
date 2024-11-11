
const multer = require('multer');
const  path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
    console.log("Im in filefilter");
  } else {
    cb(new Error('Only JPG and PNG files are allowed!'), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
