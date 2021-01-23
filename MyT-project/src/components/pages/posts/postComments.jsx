import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteComment from "./deleteComment";
import {
  addComment,
  deleteComment,
  inEditComment,
} from "../../../store/posts/postsComments/commentsActions";
import { getHighlightedText } from "../../../services/utils";

class PostComments extends Component {
  state = {
    value: "",
    newComment: "",
  };

  postChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }

  /* add comment to post */
  handleSubmit(e) {
    e.preventDefault();
    const { post } = this.props;
    const { user } = this.props.data;
    const comment = {
      name: `${user.first_name} ${user.last_name}`,
      comment: this.state.value,
      id: `${post.id}-${post.comments.length + 1}`,
      user_id: user._id,
      inEdit: false,
    };
    if (this.state.value.length > 0) {
      this.props.addComment(post.id, comment);
      this.setState({ value: "" });
    }
  }

  findCommenter(comment, user) {
    if (comment.user_id === user._id) return true;
    return false;
  }
  handleCommentEdit(post, comment) {
    this.props.inEditComment(post.id, comment.id);
  }
  async DeleteComment(post, comment) {
    await this.props.deleteComment(post.id, comment);
  }

  render() {
    const { user, search } = this.props.data;
    const { post } = this.props;

    let isAuther = false;
    if (post.user_id === user._id) isAuther = true;

    return (
      <div className="comments_div_main">
        <div className="container comments_div">
          <div className="comments">
            {/* {!post.comments.length > 0 && (
              <div className="comment_placeholder">be the first to comment</div>
            )} */}
            {post.comments &&
              post.comments.map((comment, i) => (
                <React.Fragment key={i}>
                  <div className="comment">
                    <div className="text">
                      {this.findCommenter(comment, user) && (
                        <div className="edit_comment_btn">
                          <img
                            src="/imgs/icons/edit.png"
                            alt="edit-comment"
                            onClick={() => {
                              this.handleCommentEdit(post, comment);
                            }}
                          />
                        </div>
                      )}
                      {!comment.inEdit && (
                        <React.Fragment>
                          {getHighlightedText(comment.comment, search)}
                        </React.Fragment>
                      )}
                      {comment.inEdit && (
                        <React.Fragment>
                          <DeleteComment comment={comment} post={post} />
                        </React.Fragment>
                      )}
                    </div>
                    <div className="auther">
                      by {getHighlightedText(comment.name, search)}
                    </div>

                    {/* delete comment: */}
                    {this.findCommenter(comment, user) && (
                      <button
                        className="btn delete_btn"
                        onClick={() => {
                          this.DeleteComment(post, comment);
                        }}
                      >
                        x
                      </button>
                    )}
                    {isAuther && (
                      <button
                        className="btn delete_btn"
                        onClick={() => {
                          this.DeleteComment(post, comment);
                        }}
                      >
                        x
                      </button>
                    )}
                  </div>
                </React.Fragment>
              ))}
          </div>
          {/* write comment */}
          <form className="write_comment_div container">
            <input
              value={this.state.value}
              type="text"
              placeholder="write your comment..."
              onChange={(e) => {
                this.postChange(e);
              }}
            />
            {/* send comment */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              send
            </button>
          </form>
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
    addComment: (postId, comment) => dispatch(addComment(postId, comment)),
    inEditComment: (postId, commentId) =>
      dispatch(inEditComment(postId, commentId)),
    deleteComment: (postId, comment) =>
      dispatch(deleteComment(postId, comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
