const Blog = require("../models/blog");
const User = require("../models/user");

const getAll = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blogs" });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, url, author, likes = 0 } = req.body;
    const user = await User.findById(req.body.userId);

    if (!title || !url || !author) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(blog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid blog data", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Blog not found" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const updatedBlog = req.body;
    const id = req.params.id;
    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid blog data" });
  }
};

module.exports = { getAll, createBlog, deleteBlog, updateBlog };
