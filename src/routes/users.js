const express = require("express");
const router = express.Router();
const { register, login, getUsers } = require("../controller/users.js");
const { protect } = require("../middlewares/auth.js");

router.post("/register", register).post("/login", login).get("/", protect, getUsers);

module.exports = router;
