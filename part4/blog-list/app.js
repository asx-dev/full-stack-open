const express = require("express");
const app = express();
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);

module.exports = app;
