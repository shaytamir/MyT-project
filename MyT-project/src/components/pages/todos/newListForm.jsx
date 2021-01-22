import React from "react";
import Form from "../../common/form";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  addTodoList,
  incListsCount,
} from "../../../store/todoLists/lists/listsActions";

import { randColor } from "../../../services/colorService";

class NewListForm extends Form {
  state = {
    list_name: "",
  };

  valueChange = (e) => {
    this.setState({ list_name: e.target.value });
  };

  doSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.props.data;
    const { list_name } = this.state;
    let listCount = user.todoLists_count + 1;
    listCount = user._id + "-" + String(listCount);
    const listColor = await randColor();

    let list = {
      list_name: list_name,
      user_id: user._id,
      id: listCount,
      list_color: listColor,
      peack_color: false,
    };
    if (list.list_name === "") list.list_name = "New Todo List";
    try {
      await this.props.addTodoList(list);
      await this.props.incListsCount(user);
      toast("new todo list added");
      this.setState({ list_name: "" });

      e.target.value = "";
      this.textInput.value = "";
      this.textInput.focus();
    } catch {
      console.log("bahhhh");
    }
  };

  render() {
    const { user } = this.props.data;
    return (
      <div className="newList_form">
        {!user.todos_history && (
          <form
            className="form"
            autoComplete="off"
            name="newList_form"
            onSubmit={(e) => {
              this.doSubmit(e);
            }}
          >
            <input
              ref={(el) => {
                this.textInput = el;
              }}
              className=""
              type="text"
              value={this.state.text}
              onChange={(e) => this.valueChange(e)}
            />
            <button className="btn btn-primary">Add</button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, more) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: (list, count) => dispatch(addTodoList(list, count)),
    incListsCount: (count) => dispatch(incListsCount(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewListForm);
