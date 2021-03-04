const route = require("express").Router();
const _ = require("lodash");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
// const { emailRegex } = require("../public/js/regex");

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    {
    }
    console.log("errorr");
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("invalid emal or password");
    return res.send("Invalid email or password.").status(400);
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    console.log("invalid email or pasword");
    return res.send("Invalid email or password.").status(400);
  }

  res.json({ token: user.generateAuthToken() });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = route;
