// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./upload/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

// // file falidation

// // const fileFilter = (req, file, cb) => {
// //   if (file.mimetype === "image/jpg" || file.mimetype === "imgae/png") {
// //     cb(null, true);
// //   } else {
// //     cb({ message: "Unsuuport file format" }, false);
// //   }
// // };

// const upload = multer({
//   storage: storage,
//   limit: { fileSize: 1024 * 24 },
//   // fileFilter,
// });

// module.exports = upload;
const multer = require("multer");

exports.upload = multer({
  storage: multer.diskStorage({}),
});
