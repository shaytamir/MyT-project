import React, { Component } from "react";
import { connect } from "react-redux";
import {
  restoreTodo,
  DELETEtodo,
} from "../../../store/todoLists/todo/todoActions";
import { getHighlightedText } from "../../../services/utils";

class RemovedItem extends Component {
  state = {};

  handleRestoreTodo(todo, list) {
    this.props.restoreTodo(todo, list.id);
  }
  handleDELETEtodo(todo, list) {
    this.props.DELETEtodo(todo, list.id);
  }

  render() {
    const { todo, list, history } = this.props;
    const { search } = this.props.data;

    return (
      <React.Fragment>
        <div className="flex removeItem_main">
          <div className="item">{getHighlightedText(todo.title, search)} </div>

          {!history && (
            <div className="img_div">
              <img
                src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/04-512.png"
                alt=""
                className="restore"
                onClick={() => {
                  this.handleRestoreTodo(todo, list);
                }}
              />
              <img
                src="https://freepikpsd.com/wp-content/uploads/2019/10/delete-icon-png-8-Transparent-Images.png"
                alt=""
                className="restore"
                onClick={() => {
                  this.handleDELETEtodo(todo, list);
                }}
              />
            </div>
          )}
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
    restoreTodo: (todo, listId) => dispatch(restoreTodo(todo, listId)),
    DELETEtodo: (todo, listId) => dispatch(DELETEtodo(todo, listId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemovedItem);
