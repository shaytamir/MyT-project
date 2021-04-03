const route = require("express").Router();
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

route.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find();
    console.log("get users success");
    res.send(users).status(200);
  } catch (err) {
    console.log("get users failed..");
  }
});

route.patch("/me/todos-history", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.todos_history) {
      user.todos_history = true;
    } else if (user.todos_history) {
      user.todos_history = false;
    }
    await user.save();
    console.log("success - toggle todos-history -  success");

    res.send(user).status(200);
  } catch (err) {
    console.log("failure -toggle todos-history -  failure");
    res.send(err).status(400);
  }
});
route.patch("/me/todolists-count", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.todoLists_count = req.body.newCount;
    console.log(req.body);
    await user.save();
    console.log("success - increment user todolists count -  success");

    res.send(user).status(200);
  } catch (err) {
    console.log("failure - increment user todolists count -  failure");
    res.send(err).status(400);
  }
});

route.patch("/me/posts-count", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.posts_count++;

    await user.save();
    console.log("success - increment user todolists count -  success");

    res.send(user).status(200);
  } catch (err) {
    console.log("failure - increment user todolists count -  failure");
    res.send(err).status(400);
  }
});

route.patch("/me/upload-img", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.haveImg = true;
    await user.save();
    console.log("success - increment user todolists count -  success");

    res.send(user).status(200);
  } catch (err) {
    console.log("failure - increment user todolists count -  failure");
    res.send(err).status(400);
  }
});

route.patch("/me/logs", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    user.firstLogin = true;
    await user.save();
    console.log("First Login success");
    res.send(user).status(200);
  } catch (err) {
    console.log("cant count logs", err);
  }
});

route.patch("/me", auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.cell = req.body.cell;
    user.biz = req.body.biz;
    user.gender = req.body.gender;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    console.log("edit user success");

    res.status(200).send(user);
  } catch (err) {
    console.log("edit users failed..");
  }
});

route.delete("/me/delete", auth, async (req, res) => {
  const user = await User.findOneAndRemove({
    _id: req.user._id,
  });
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  // res.send(user);
  res.status(200).send("user has been deleted");
});
 
route.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("fetch user success");

    res.send(user).status(200);
  } catch (err) {
    console.log("get users failed..");
  }
});

route.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log("errorr");
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    console.log("*** err *** User already registered");
    return res.status(400).send("** User already registered");
  }

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user.save();

  console.log("** User registered successfuly");
  console.log("**", _.pick(user, ["_id", "first_name", "email"]));
  // createUserTodos();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = route;
