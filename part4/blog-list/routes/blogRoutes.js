const express = require("express");
const router = express.Router();
const { getAll, createBlog, deleteBlog } = require("../controllers/blogs");

router.get("/", getAll);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
