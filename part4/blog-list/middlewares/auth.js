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

module.exports = tokenExtractor;
