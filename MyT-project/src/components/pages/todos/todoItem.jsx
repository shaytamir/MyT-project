import React, { Component } from "react";

import { connect } from "react-redux";

import {
  removeTodo,
  toggleIsChecked,
  inEditTodo,
} from "../../../store/todoLists/todo/todoActions";
import { getHighlightedText } from "../../../services/utils";
import EditTodo from "./editTodo";

class TodoItem extends Component {
  state = {
    inEdit: false,
  };

  /* delete todo */
  handleDeleteTodo(todo, list) {
    console.log(todo);
    this.props.removeTodo(todo, list.id);
  }

  /* check in/out todo */
  toggleIsChecked(list, todo) {
    console.log(list.id);
    this.props.toggleIsChecked(list.id, todo);
  }

  render() {
    const { todo, list, history } = this.props;
    const { search } = this.props.data;
    let title = getHighlightedText(todo.title, search);

    return (
      <React.Fragment>
        <div className="flex todoItem_main">
          {!history && (
            <input
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => this.toggleIsChecked(list, todo)}
            />
          )}
          {!todo.inEdit && (
            <div
              className="item"
              onClick={() => {
                this.props.inEditTodo(todo, list.id);
              }}
            >
              {title}
            </div>
          )}

          {todo.inEdit && <EditTodo todo={todo} list={list} />}

          <div className="button_div">
            {!history && (
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-759-552068.png"
                alt=""
                className="delete"
                onClick={() => {
                  this.handleDeleteTodo(todo, list);
                }}
              />
            )}
          </div>
        </div>
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
    removeTodo: (todo, listId) => dispatch(removeTodo(todo, listId)),
    inEditTodo: (todo, listId) => dispatch(inEditTodo(todo, listId)),
    toggleIsChecked: (listid, todo) => dispatch(toggleIsChecked(listid, todo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
