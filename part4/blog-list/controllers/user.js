const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    if (!username || !name || !password)
      return res.status(400).json("Missing required fields");

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
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: "Error getting users" });
  }
};

module.exports = { createUser, getAllUsers };
