import React, { Component } from "react";
import TodoItem from "./todoItem";
import { connect } from "react-redux";
import {
  restoreList,
  DELETElist,
} from "../../../store/todoLists/lists/listsActions";
import { swalConfitm } from "../../../services/utils";
import RemovedItem from "./removedItem";

class HistoryLists extends Component {
  someFunc(todos) {
    /* checks for deleted todos and returns an <hr> between */
    return todos.some((todo) => {
      return todo.isDeleted;
    });
  }
  async handdleRestore(list) {
    this.props.restoreList(list);
  }

  async handdleDELETE(list) {
    const prompt = await swalConfitm();
    if (prompt) {
      this.props.DELETElist(list);
    }
  }

  render() {
    const { list } = this.props;
    return (
      <div
        className="todoList_main"
        style={{ backgroundColor: list.list_color }}
      >
        <div>
          <div className="todoList_main_flex">
            <h4>{list.list_name}</h4>
            <div className="flex3">
              <img
                src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/04-512.png"
                alt="edit colors"
                onClick={() => {
                  this.handdleRestore(list);
                }}
              />
              <img
                src="https://freepikpsd.com/wp-content/uploads/2019/10/delete-icon-png-8-Transparent-Images.png"
                alt=""
                onClick={() => {
                  this.handdleDELETE(list);
                }}
              />
            </div>
          </div>

          <div>
            {list.todos &&
              list.todos.length &&
              list.todos.map((todo, i) => (
                <React.Fragment key={i}>
                  {!todo.isDeleted && (
                    <TodoItem list={list} todo={todo} history={true} />
                  )}
                </React.Fragment>
              ))}
            {list.todos && list.todos.length && this.someFunc(list.todos) && (
              <hr />
            )}{" "}
            {list.todos &&
              list.todos.length &&
              list.todos.map((todo, i) => (
                <React.Fragment key={i}>
                  {todo.isDeleted && (
                    <RemovedItem list={list} todo={todo} history={true} />
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
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
    restoreList: (list) => dispatch(restoreList(list)),
    DELETElist: (list) => dispatch(DELETElist(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLists);
