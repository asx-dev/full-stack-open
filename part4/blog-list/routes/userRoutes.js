const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, login } = require("../controllers/user");

router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/login", login);

module.exports = router;
