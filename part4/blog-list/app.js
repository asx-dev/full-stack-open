const express = require("express");
const app = express();
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
// SuperTest
const dbConnect = require("./databases/db");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);

// Provisional Start Server for Supertest use
const startServer = async () => {
  await dbConnect();
  app.listen(8080);
};
startServer();

module.exports = app;
