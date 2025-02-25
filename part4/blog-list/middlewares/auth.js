const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const getToken = (req) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (req, res, next) => {
  const token = getToken(req) || null;
  req.token = token;
  next();
};

const userExtractor = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    const decodedToken = jwt.verify(token, config.SECRET);
    req.user = decodedToken;
  }
  next();
};

module.exports = { tokenExtractor, userExtractor };
