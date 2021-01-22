import React from "react";
import Form from "../../common/form";
import { connect } from "react-redux";
import {
  addTodo,
  incTodosCount,
} from "../../../store/todoLists/todo/todoActions";

class AddTodoForm extends Form {
  state = {
    text: "",
  };

  valueChange = (e) => {
    this.setState({ text: e.target.value });
  };

  doSubmit = async (e) => {
    e.preventDefault();
    if (this.state.text.length > 0) {
      const { list } = this.props;
      const listId = list.id;
      const count = list.todosCount + 1;
      let todo = {
        title: this.state.text,
        isChecked: false,
        id: listId + "-" + count,
        isDeleted: false,
        inEdit: false,
      };

      await this.props.addTodo(todo, listId);
      await this.props.incTodosCount(listId);
    }
    this.setState({ text: "" });
    this.textInput.focus();
  };

  render() {
    return (
      <div className="todoForm_input">
        <form className="form" autoComplete="off" name="newTodo_form">
          <input
            ref={(el) => {
              this.textInput = el;
            }}
            className=""
            type="text"
            value={this.state.text}
            onChange={(e) => this.valueChange(e)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              this.doSubmit(e);
            }}
          >
            Add
          </button>
        </form>
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
    addTodo: (todo, id) => dispatch(addTodo(todo, id)),
    incTodosCount: (count) => dispatch(incTodosCount(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);
