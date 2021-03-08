const route = require("express").Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const { User } = require("../models/user");

route.get("/get-all-posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    console.log("get posts success");
    res.send(posts).status(200);
  } catch (ex) {
    console.log("get posts failed..");
  }
});

route.get("/my-posts", auth, async (req, res) => {
  const myPosts = await Post.find({ user_id: req.user._id });
  res.send(myPosts);
});

route.patch("/liked/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    id: req.params.id,
  });
  if (!post) {
    console.log("cant find post");
    return res.status(404).send("The post with the given ID was not found.");
  }
  post.likes = [...post.likes, req.user._id];
  await post.save();
  res.send(post).status(200);
});
route.patch("/un-liked/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    id: req.params.id,
    //  user_id: req.user._id,
  });
  if (!post) {
    console.log("cant find post");
    return res.status(404).send("The post with the given ID was not found.");
  }
  post.likes = post.likes.filter((like) => like !== req.user._id);
  await post.save();
  res.send(post).status(200);
});

route.patch("/edit-post/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    id: req.params.id,
    user_id: req.user._id,
  });
  if (!post) {
    console.log("cant find post");
    return res.status(404).send("The post with the given ID was not found.");
  }
  post.post = req.body.value;
  await post.save();
  res.send(post).status(200);
});

/* add comment */
route.patch("/add-comment/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    id: req.params.id,
  });
  if (!post) {
    console.log("cant find post");
    return res.status(404).send("The post with the given ID was not found.");
  }
  post.comments.push(req.body.comment);
  await post.save();
  res.send(post).status(200);
});

/* edit comment */
route.patch("/edit-comment/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    id: req.params.id,
  });
  if (!post) {
    console.log("cant find post");
    return res.status(404).send("The post with the given ID was not found.");
  }
  const newComments = post.comments.map((comment) => {
    if (comment.id === req.body.comment.id) comment.comment = req.body.newValue;
    return comment;
  });
  post.comments = [];
  post.comments = newComments;
  await post.save();
  res.send(post).status(200);
});

/* delete comment */
route.patch("/delete-comment/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    id: req.params.id,
  });
  if (!post) {
    console.log("cant find post");
    return res.status(404).send("The post with the given ID was not found.");
  }
  post.comments = post.comments.filter((coment) => {
    return coment.id !== req.body.comment.id;
  });
  await post.save();
  res.send(post).status(200);
});

route.get("/:id", auth, async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

route.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndRemove({
      user_id: req.user._id,
      id: req.params.id,
    });
    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
    console.log("success - delete post - success");
    res.send(post).status(200);
  } catch (err) {
    console.log("failure - delete post -  failure", err);
    res.send(err).status(400);
  }
});

route.post("/", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) {
    console.log("eror user validation", err);
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findById(req.user._id);
  const userName = `${user.first_name} ${user.last_name}`;
  const newId = `${req.user._id}-${++user.posts_count}`;
  let post = await new Post({
    post: req.body.post,
    id: newId,
    user_name: userName,
    user_id: req.user._id,
  });
  post = post.save();
  res.send(post).status(200);
});

module.exports = route;
