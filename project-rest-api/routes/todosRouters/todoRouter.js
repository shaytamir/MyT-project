const route = require("express").Router();
const _ = require("lodash");
const auth = require("../../middleware/auth");

const { TodoList } = require("../../models/todoList");

route.patch("/add-todo/:id", auth, async (req, res) => {
  const todoList = await TodoList.findOne({
    user_id: req.user._id,
    id: req.params.id,
  });
  if (!todoList)
    return res.status(404).send("The user with the given ID was not found.");

  todoList.todos.push(req.body);
  todoList.save();
  res.send(todoList).status9200;
});

route.patch("/edit-todo/:id", auth, async (req, res) => {
  const todoList = await TodoList.findOne({
    user_id: req.user._id,
    id: req.params.id,
  });
  if (!todoList)
    return res.status(404).send("The user with the given ID was not found.");

  const todos = todoList.todos.map((todo) => {
    if (todo.id === req.body.todo.id) {
      todo.title = req.body.newText;
    }
    return todo;
  });
  todoList.todos = [];
  todoList.todos = todos;

  todoList.save();
  res.send(todoList).status9200;
});
route.patch("/is-checked/:id", auth, async (req, res) => {
  const todoList = await TodoList.findOne({
    user_id: req.user._id,
    id: req.params.id,
  });
  if (!todoList) {
    console.log("todoList not found");
    return res.status(404).send("The user with the given ID was not found.");
  }

  const todos = todoList.todos.map((todo) => {
    if (todo.id === req.body.todo.id) {
      !todo.isChecked ? (todo.isChecked = true) : (todo.isChecked = false);
    }
    return todo;
  });
  todoList.todos = [];
  todoList.todos = todos;

  console.log("todoList", todoList);
  todoList.save();
  res.send(todoList).status9200;
});

route.patch("/remove/:id", auth, async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      id: req.params.id,
      user_id: req.user._id,
    });
    const todos = todoList.todos.map((todo) => {
      if (todo.id === req.body.id) {
        todo.isDeleted = true;
      }
      return todo;
    });
    console.log("todos", todos);
    todoList.todos = [];
    todoList.todos = todos;
    await todoList.save();
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't remove todo", err);
  }
});
route.patch("/restore/:id", auth, async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      id: req.params.id,
      user_id: req.user._id,
    });
    const todos = todoList.todos.map((todo) => {
      if (todo.id === req.body.id) {
        todo.isDeleted = false;
      }
      return todo;
    });
    todoList.todos = [];
    todoList.todos = todos;
    await todoList.save();
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't restore todo", err);
  }
});
route.patch("/delete/:id", auth, async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      id: req.params.id,
      user_id: req.user._id,
    });
    const todos = todoList.todos.filter((todo) => {
      return todo.id !== req.body.id;
    });
    todoList.todos = [];
    todoList.todos = todos;
    await todoList.save();
    res.send(todoList).status(200);
  } catch (err) {
    console.log("couldn't delete todo", err);
  }
});

module.exports = route;
