const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authenticateUser = function (req, res, next) {
  const token = req.headers["x-auth"].split(" ")[1];
  let tokenData;
  try {
    tokenData = jwt.verify(token, "omen");
    req.userId = tokenData;

    next();
  } catch (e) {
    res.json(e.message);
    console.log(e.message, "error");
  }
};
const adminAuth = function (req, res, next) {
  try {
    if (req.userId.role == "admin") {
      next();
    }
  } catch (e) {
    res.json(e.message);
  }
};

module.exports = {
  authenticateUser,
  adminAuth,
};
