import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editPostOn,
  editPostOff,
  deletePost,
} from "../../../store/posts/editPost/editPostActions";

class EditPost extends Component {
  async editPost2On(post) {
    console.log(post);
    if (post.isEditOn) {
      console.log(999999);
      await this.props.editPostOff(post.id);
    } else {
      await this.props.editPostOn(post.id);
    }
  }

  DeletePost(post) {
    this.props.deletePost(post.id);
  }
  render() {
    const { post } = this.props;
    return (
      <div className="edit_main_div ">
        <img
          className="edit_icon"
          src=" /imgs/icons/edit.png"
          alt="edit"
          onClick={() => {
            this.editPost2On(post);
          }}
        />
        {!post.isEditOn && (
          <React.Fragment>
            <img
              class="delete_post"
              src="imgs/icons/x.png"
              alt="delete post"
              onClick={() => {
                this.DeletePost(post);
              }}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, more) => {
  return {
    posts: state.posts,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (postId) => dispatch(deletePost(postId)),

    editPostOn: (postId) => dispatch(editPostOn(postId)),
    editPostOff: (postId) => dispatch(editPostOff(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
