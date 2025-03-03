const express = require("express");
const app = express();
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const middleware = require("./middlewares/auth");

// SuperTest
const dbConnect = require("./databases/db");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

// Provisional Start Server for Supertest use
// const startServer = async () => {
//   await dbConnect();
//   app.listen(8080);
// };
// startServer();

module.exports = app;
