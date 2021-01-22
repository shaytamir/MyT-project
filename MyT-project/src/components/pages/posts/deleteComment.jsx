import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editComment,
  outEditComment,
} from "../../../store/posts/postsComments/commentsActions";

class DeleteComment extends Component {
  state = {
    value: "",
  };

  componentDidMount() {
    const { comment } = this.props;
    this.setState({ value: comment.comment });
  }

  commentChange(e) {
    const newValue = e.target.value;
    this.setState({ value: newValue });
  }

  async handleCommetEditBlur(post, comment, value) {
    await this.props.editComment(post.id, comment, value);
    await this.props.outEditComment(post.id, comment.id);
  }

  render() {
    const { post, comment } = this.props;

    return (
      <div>
        <input
          type="text"
          className="edit_input"
          value={this.state.value}
          ref={(el) => {
            this.textInput = el && el.focus();
          }}
          onChange={(e) => {
            this.commentChange(e);
          }}
          onBlur={() => {
            this.handleCommetEditBlur(post, comment, this.state.value);
          }}
        />
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
    editComment: (postId, comment, newValue) =>
      dispatch(editComment(postId, comment, newValue)),

    outEditComment: (postId, commentId) =>
      dispatch(outEditComment(postId, commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteComment);
