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

    if (!title || !url || !author) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (!req.user.id) {
      return res.status(401).json({ message: "Token invalid" });
    }

    const user = await User.findById(req.user.id);

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const user = req.user;
    const blogUserId = await Blog.findById(req.params.id);
    if (user.id !== blogUserId.user.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error deleting blog" });
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
