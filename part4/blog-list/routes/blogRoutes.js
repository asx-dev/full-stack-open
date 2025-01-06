const express = require("express");
const router = express.Router();
const { getAll, createBlog } = require("../controllers/blogs");

router.get("/", getAll);
router.post("/", createBlog);

module.exports = router;
