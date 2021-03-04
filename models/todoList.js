const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const { User } = require("./User");
const { string, bool, boolean } = require("@hapi/joi");

const todoListSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  list_name: {
    type: String,
    maxlength: 255,
    default: "New Todo List",
  },
  todos: {
    type: Array,
  },
  todosCount: {
    type: Number,
    default: 1,
  },

  deleted_todos: {
    type: Array,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  peack_color: {
    type: Boolean,
    default: false,
  },
  inEditTitle: {
    type: Boolean,
    default: false,
  },

  list_color: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const TodoList = mongoose.model("todoList", todoListSchema);

function validateList(list) {
  console.log(list);
  const schema = Joi.object({
    list_name: Joi.string().allow(""),
    user_id: Joi.string(),
    id: Joi.string(),
    list_color: Joi.string(),
    peack_color: Joi.boolean(),
  });
  return schema.validate(list);
}
const userTodoListsCount = async (id) => {
  const user = await User.findById(id);
  return user.todoLists_count;
};

const myFirstTodo = (id) => {
  const idtodoId = id + "-1";
  return [{ title: "my first task", isChecked: true, isDeleted: false }];
};

const exp = {
  TodoList,
  validateList,
  myFirstTodo,
  userTodoListsCount,
};
module.exports = exp;
