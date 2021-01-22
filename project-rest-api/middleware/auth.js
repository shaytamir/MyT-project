const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");
  // console.log(token);
  if (!token) res.status(404).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("userKey"));
    req.user = decoded;
    next();
  } catch (err) {
    console.log("auth err");
    res.status(400).send("Invalid token");
    console.log(err);
  }
};
