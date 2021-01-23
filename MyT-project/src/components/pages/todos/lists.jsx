import React, { Component } from "react";
import AddTodoForm from "./todoForm";
import TodoItem from "./todoItem";
import { colorsObj } from "../../../services/colorService";
import { connect } from "react-redux";
import {
  removeList,
  listChangeColor,
  inEditList,
} from "../../../store/todoLists/lists/listsActions";
import { myActiveTodosCount } from "../../../services/todosService";
import RemovedItem from "./removedItem";
import { getHighlightedText } from "../../../services/utils";
import EditListTitle from "./editListTitle";

class TodoList extends Component {
  state = {
    colorEdit: false,
  };

  async removeTodoList(list, user) {
    let listCount = await myActiveTodosCount();
    await this.props.removeList(list, listCount);
  }

  toggleEditColors(state) {
    console.log(111);
    !this.state.colorEdit
      ? this.setState({ colorEdit: true })
      : this.setState({ colorEdit: false });
  }

  handdleColor(list, color) {
    this.props.listChangeColor(list, color);
  }

  someFunc(todos) {
    /* checks for deleted todos and returns an <hr> between */
    return todos.some((todo) => {
      return todo.isDeleted;
    });
  }

  render() {
    const { list, i } = this.props;
    const { user, search } = this.props.data;
    const colorsArr = [...Object.values(colorsObj)];
    const colorEdit = this.state;
    const listName = getHighlightedText(list.list_name, search);

    return (
      <React.Fragment>
        {list && !list.isDeleted && (
          <React.Fragment>
            <div
              className="todoList_main"
              style={{ backgroundColor: list.list_color }}
            >
              <div className="todoList_main_flex">
                {!list.inEditTitle && (
                  <h4
                    onClick={() => {
                      this.props.inEditList(list.id);
                    }}
                  >
                    {listName}
                  </h4>
                )}

                {list.inEditTitle && <EditListTitle list={list} />}

                <div className="flex3">
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/color-plate-58-808898.png"
                    alt="edit colors"
                    onClick={() => {
                      this.toggleEditColors(colorEdit);
                    }}
                  />
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-759-552068.png"
                    alt=""
                    onClick={() => {
                      this.removeTodoList(list, user);
                    }}
                  />
                </div>
                {this.state.colorEdit && (
                  <React.Fragment>
                    <div className="colors_div">
                      {colorsArr &&
                        colorsArr.map((color, i) => (
                          <React.Fragment key={i}>
                            <div
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                this.handdleColor(list, color);
                              }}
                            ></div>
                          </React.Fragment>
                        ))}
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div>
                <AddTodoForm list={list} i={i} />
              </div>
              <div>
                {list.todos &&
                  list.todos.length &&
                  list.todos.map((todo, i) => (
                    <React.Fragment key={i}>
                      {!todo.isDeleted && <TodoItem list={list} todo={todo} />}
                    </React.Fragment>
                  ))}
                {list.todos &&
                  list.todos.length &&
                  this.someFunc(list.todos) && <hr />}

                {list.todos &&
                  list.todos.length &&
                  list.todos.map((todo, i) => (
                    <React.Fragment key={i}>
                      {todo.isDeleted && (
                        <RemovedItem list={list} todo={todo} />
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeList: (list) => dispatch(removeList(list)),
    listChangeColor: (list, color) => dispatch(listChangeColor(list, color)),
    inEditList: (list) => dispatch(inEditList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
