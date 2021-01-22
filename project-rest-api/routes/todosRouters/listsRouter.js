const route = require("express").Router();
const _ = require("lodash");
const auth = require("../../middleware/auth");
const {
  TodoList,
  validateList,
  myFirstTodo,
} = require("../../models/todoList");

route.patch("/todos-count/:id", auth, async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      user_id: req.user._id,
      id: req.params.id,
    });
    console.log(111);
    todoList.todosCount++;

    await todoList.save();
    console.log("success - increment user todolists count -  success");

    res.send(todoList).status(200);
  } catch (err) {
    console.log("failure - increment  todos count -  failure", err);
    res.send(err).status(400);
  }
});

route.get("/:id", auth, async (req, res) => {
  const todoList = await TodoList.findOne({
    user_id: req.user._id,
    _id: req.params.id,
  });
  res.send(todoList).status(200);
});

route.patch("/change-color/:id", auth, async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      user_id: req.user._id,
      id: req.params.id,
    });

    todoList.list_color = req.body.color;
    await todoList.save();
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't change list color");
  }
});

route.patch("/edit-list-name/:id", auth, async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      user_id: req.user._id,
      id: req.params.id,
    });

    todoList.list_name = req.body.value;
    await todoList.save();
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't change list color");
  }
});

route.patch("/remove/:id", auth, async (req, res) => {
  try {
    let todoList = await TodoList.findOne({
      user_id: req.user._id,
      id: req.params.id,
    });

    todoList.isDeleted = true;
    await todoList.save();
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't remove list");
  }
});
route.patch("/restore/:id", auth, async (req, res) => {
  try {
    let todoList = await TodoList.findOne({
      user_id: req.user._id,
      id: req.params.id,
    });
    todoList.isDeleted = false;
    await todoList.save();
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't remove list");
  }
});
route.delete("/delete/:id", auth, async (req, res) => {
  try {
    let todoList = await TodoList.findOneAndDelete({
      user_id: req.user._id,
      id: req.params.id,
    });
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't delete list");
  }
});

route.get("/", auth, async (req, res) => {
  try {
    const todoLists = await TodoList.find({ user_id: req.user._id }).sort({
      _id: -1,
    });
    res.send(todoLists).status(200);
  } catch (err) {
    console.log("couldn't get todos");
  }
});

route.post("/", auth, async (req, res) => {
  // listId = req.user._id + req.body.id;
  // req.body.id = listId;
  const { error } = validateList(req.body);
  if (error) {
    console.log("err list validation");
    return res.status(400).send(error.details[0].message);
  }
  // const newId = req.user._id + "-" + listCount;

  let todoList = new TodoList({
    list_name: req.body.list_name,
    id: req.body.id,
    todos: myFirstTodo(req.user._id),
    deletedTodos: [],
    isDeleted: false,
    list_color: req.body.list_color,
    peack_color: false,
    user_id: req.user._id,
  });
  try {
    post = await todoList.save();
    res.send(post);
  } catch (err) {
    console.log("list not created..", err);
  }
  // incrementUserTodoLists(listsCount);
});

module.exports = route;
