const express = require("express");
const router = express.Router();
const {
  getAll,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");

router.get("/", getAll);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

module.exports = router;
