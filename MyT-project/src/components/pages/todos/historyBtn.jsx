import React, { Component } from "react";
import { connect } from "react-redux";
// import { toast } from "react-toastify";
import { historyBtnToggler } from "../../../store/todoLists/lists/listsActions";

class HistoryButton extends Component {
  state = {};

  async handleClick(user) {
    await this.props.historyBtnToggler(user);
  }

  render() {
    const { user } = this.props.data;
    const history = user.todos_history;
    return (
      <div className="">
        <button
          className="btn btn-info history_btn"
          onClick={() => {
            this.handleClick(user);
          }}
        >
          {!history && <React.Fragment>Todos History</React.Fragment>}
          {history && <React.Fragment>Todo-Lists</React.Fragment>}
        </button>
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
    historyBtnToggler: (user) => dispatch(historyBtnToggler(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryButton);
