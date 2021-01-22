const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const { string } = require("@hapi/joi");

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  post: {
    type: String,
    minlength: 1,
    maxlength: 1024,
    required: true,
  },
  user_name: {
    type: String,
    minlength: 2,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  isEditOn: {
    type: Boolean,
    default: false,
  },
  isCommentsOn: {
    type: Boolean,
    default: false,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", postSchema);

function validatePost(list) {
  console.log(list);
  const schema = Joi.object({
    post: Joi.string().min(2).max(1024).required(),
    id: Joi.string(),
  });
  return schema.validate(list);
}

const exp = {
  Post,
  validatePost,
};
module.exports = exp;
