const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCltr = {};

userCltr.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  bcrypt
    .genSalt()
    .then((salt) => {
      bcrypt
        .hash(user.password, salt)
        .then((encrypted) => {
          user.password = encrypted;
          user
            .save()
            .then((user) => {
              res.json(user);
            })
            .catch((err) => {
              res.json(err);
            });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

userCltr.login = (req, res) => {
  const body = req.body;
  User.findOne({email: body.email}).then((user) => {
    if (!user) {
      res.json({
        error: "invalid email or password",
      });
    }
    bcrypt.compare(body.password, user.password).then((match) => {
      if (match) {
        const tokenData = {
          _id: user._id,
          email: user.email,
          role: user.role,
        };
        const token = jwt.sign(tokenData, "omen", {expiresIn: "10d"});
        console.log(token);
        res.json({
          token: `Brearer ${token}`,
        });
      } else {
        res.json({
          error: "invalid email or password",
        });
      }
    });
  });
};

userCltr.account = (req, res) => {
  console.log("this is account", req.userId);
  res.json(req.userId);
};

module.exports = userCltr;
