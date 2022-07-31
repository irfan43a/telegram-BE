const express = require("express");
const router = express.Router();
const { register, login, getUsers, profile, editProfile, profileFiend } = require("../controller/users.js");
const { protect } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/upload.js");

router.post("/register", register).post("/login", login).get("/", protect, getUsers).get("/profile", protect, profile).get("/friend/:id", protect, profileFiend).put("/profile", protect, upload.single("profileimage"), editProfile);

module.exports = router;
