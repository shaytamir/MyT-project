import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editTodo,
  outEditTodo,
} from "../../../store/todoLists/todo/todoActions";

class EditTodo extends Component {
  state = {
    todoValue: "",
  };

  componentDidMount() {
    const { todo } = this.props;
    this.setState({ todoValue: todo.title });
  }

  handleChange(e) {
    this.setState({ todoValue: e.target.value });
  }
  async handleEditTodo(list, todo) {
    const newText = this.state.todoValue;
    if (newText.length > 0) await this.props.editTodo(todo, list.id, newText);
    else await this.props.editTodo(todo, list.id, todo.title);

    await this.props.outEditTodo(todo, list.id);
  }
  render() {
    const { todo, list } = this.props;
    return (
      <div>
        <input
          ref={(el) => {
            this.textInput = el && el.focus();
          }}
          className="item"
          value={this.state.todoValue}
          onChange={(e) => {
            this.handleChange(e);
          }}
          onBlur={() => {
            this.handleEditTodo(list, todo);
          }}
        />
      </div>
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
    outEditTodo: (todo, listId) => dispatch(outEditTodo(todo, listId)),
    editTodo: (todo, listid, newText) =>
      dispatch(editTodo(todo, listid, newText)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
