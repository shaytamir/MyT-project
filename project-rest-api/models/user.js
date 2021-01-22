const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { func } = require("@hapi/joi");

// const emailRegex = /^(?=[a-z0-9.]{3,20}$)[a-z0-9]+\.?[a-z0-9]+$|^.*@\w+\.[\w.]+$/i;
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlebgth: 2,
    maxlength: 255,
  },
  last_name: {
    type: String,
    required: true,
    minlebgth: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlebgth: 2,
    maxlength: 255,
    unique: true,
  },

  cell: {
    type: String,
    minlebgth: 8,
    maxlength: 10,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
    minlebgth: 6,
    maxlength: 1024,
  },
  gender: {
    type: String,
    minlebgth: 4,
    maxlength: 6,
  },
  biz: {
    type: Boolean,
    default: false,
  },
  isLogged: {
    type: Boolean,
    default: false,
  },
  haveImg: {
    type: Boolean,
    default: false,
  },
  logsCounter: {
    type: Number,
    default: 0,
  },
  todoLists_count: {
    type: Number,
    default: 1,
  },
  posts_count: {
    type: Number,
    default: 0,
  },

  firstLogin: {
    type: Boolean,
    default: false,
  },
  todos_history: {
    type: Boolean,
    default: false,
  },
  profile_img: {
    type: String,
    default: "",
  },
  imgCounter: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this.id }, config.get("userKey"));
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  console.log("uuser", user);
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    password_confirm: Joi.string().valid(Joi.ref("password")).required(),
    cell: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/),
    biz: Joi.boolean(),
    gender: Joi.string().min(4).max(6),
  });
  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
