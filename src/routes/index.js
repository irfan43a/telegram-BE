const express = require("express");
const router = express.Router();
const usersRoute = require("./users");
const messageRoute = require("./messages");

router.use("/users", usersRoute).use("/messages", messageRoute);

module.exports = router;
