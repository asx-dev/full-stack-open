const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    if (!username || !name || (!password && username < 3 && password < 3))
      return res
        .status(400)
        .json(
          "Error creating user, please provide all required fields. The username and password must be at least 3 characters long."
        );

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("blogs");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Error getting users" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: "3h" });
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};

module.exports = { createUser, getAllUsers, login };
