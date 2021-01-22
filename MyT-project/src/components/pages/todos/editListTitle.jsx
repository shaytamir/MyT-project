import React, { Component } from "react";
import { connect } from "react-redux";
import {
  outEditList,
  editListName,
} from "../../../store/todoLists/lists/listsActions";

class EditListTitle extends Component {
  state = {
    listName: "",
  };

  componentDidMount() {
    const { list } = this.props;
    this.setState({ listName: list.list_name });
  }

  handleChange(e) {
    this.setState({ listName: e.target.value });
  }
  async handleEditListName(list) {
    let { listName } = this.state;
    if (listName.length > 0) {
      await this.props.editListName(list.id, listName);
    } else {
      await this.props.editListName(list.id, list.list_name);
    }
    await this.props.outEditList(list.id);
  }
  render() {
    const { list } = this.props;
    return (
      <div>
        <input
          ref={(el) => {
            this.textInput = el && el.focus();
          }}
          value={this.state.listName}
          onChange={(e) => {
            this.handleChange(e);
          }}
          onBlur={() => {
            this.handleEditListName(list);
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
    outEditList: (listId) => dispatch(outEditList(listId)),
    editListName: (listid, value) => dispatch(editListName(listid, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditListTitle);
