import React, { Component } from "react";
import { connect } from "react-redux";
import { likePost, unLikePost } from "../../../store/likes/likeActions";
import {
  editPostOff,
  editPost,
} from "../../../store/posts/editPost/editPostActions";
import {
  postCommenstOn,
  postCommenstOff,
} from "../../../store/posts/postsComments/commentsActions";
import { getDate } from "../../../services/timeService";
import PostEdit from "./postEdit";
import { getHighlightedText } from "../../../services/utils";
import PostComments from "./postComments";
import img from "../my-imgs/img";
import { imgUrl } from "../../../config.json";

class PostItem extends Component {
  state = {
    isEditOn: false,
  };

  async handleLiked(postId, userId) {
    await this.props.likePost(postId, userId);
  }
  async handleUnLiked(postId, userId) {
    await this.props.unLikePost(postId, userId);
  }

  likesCounter(post) {
    const likesNum = post.likes.length;
    if (likesNum) return likesNum;
    return 0;
  }

  isMyPost(post, user) {
    if (post.user_id === user._id) {
      return true;
    }
    return false;
  }

  async handleEditBlur(e, post) {
    const value = e.target.value;
    await this.props.editPost(post.id, value);
    await this.props.editPostOff(post.id);
  }

  /* when edit set focus to end of textInput */
  endOfInput(e) {
    let temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  async postCommentsOn(post) {
    await this.props.postCommenstOn(post.id);
  }
  async postCommentsOff(post) {
    await this.props.postCommenstOff(post.id);
  }

  render() {
    const { post, user } = this.props;
    const { imgs, users } = this.props.data;

    let isMyPost = this.isMyPost(post, user);
    /* build likes logic rendering */
    let isLiked = null;
    let likesCount;
    if (post.likes && post.likes.length) {
      isLiked = post.likes.some((like) => {
        return like === user._id;
      });
      likesCount = this.likesCounter(post);
      if (!likesCount) {
        likesCount = 0;
      }
    }
    /* ** */

    /* search middlewere: */
    const { search } = this.props.data;
    let postText = getHighlightedText(post.post, search);
    let user_name = getHighlightedText(post.user_name, search);
    let postTime = getHighlightedText(getDate(post.createdAt), search);
    /* ** */

    /* img incertment if img */
    let imgAddress = null;
    const postUser = users.find((user) => {
      return user._id === post.user_id;
    });
    if (postUser && postUser.profile_img.length) {
      const img = imgs.find((img) => {
        return img.id === postUser.profile_img;
      });
      if (img.imageData.includes("blob")) imgAddress = img.imageData;
      else imgAddress = `${imgUrl}/${img.imageData}`;
    }
    /* ** */
    /* comments count */
    let commentCounter = post.comments.length;

    return (
      <div className="posts_div">
        <div className="item container">
          <div className="post_user">
            <div className="user_name">
              {user_name}
              {postUser && postUser.profile_img.length > 0 && (
                <img src={imgAddress} alt="profile-img" />
              )}
            </div>
            <div className="user_time">
              {post.createdAt ? postTime : "just now"}
            </div>
          </div>
          {post.isEditOn && (
            <React.Fragment>
              <textarea
                ref={(el) => {
                  this.textInput = el && el.focus();
                }}
                defaultValue={post.post}
                onFocus={this.endOfInput}
                className="post inEdit"
                onBlur={(e) => {
                  this.handleEditBlur(e, post);
                }}
              ></textarea>
              {/* delete img */}
            </React.Fragment>
          )}
          {!post.isEditOn && <div className="post ">{postText}</div>}
          {isMyPost && (
            <React.Fragment>
              <PostEdit post={post} />
            </React.Fragment>
          )}
        </div>

        <div className="btn_div container">
          {user.first_name && !post.isCommentsOn && (
            <button
              type="button"
              className="btn comment_btn"
              onClick={() => {
                this.postCommentsOn(post);
              }}
            >
              comments ({commentCounter})
            </button>
          )}
          {user.first_name && post.isCommentsOn && (
            <button
              type="button"
              className="btn comment_btn"
              onClick={() => {
                this.postCommentsOff(post);
              }}
            >
              comments ({commentCounter})
            </button>
          )}

          <PostComments post={post} />

          {user.first_name && !isLiked && (
            <React.Fragment>
              <button
                type="button"
                className="btn btn-primary like_btn"
                onClick={() => {
                  this.handleLiked(post.id, user._id);
                }}
              >
                like
                <span className="likesCount">
                  {likesCount ? "  (" + likesCount + ")" : " (" + 0 + ")"}
                </span>
              </button>
            </React.Fragment>
          )}

          {/* UnLike button */}
          {isLiked && (
            <React.Fragment>
              <button
                type="button"
                className="btn btn-success unLike_btn"
                onClick={() => {
                  this.handleUnLiked(post.id);
                }}
              >
                liked
                <span className="likesCount">{" (" + likesCount + ")"}</span>
              </button>
            </React.Fragment>
          )}
        </div>
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
    likePost: (postId, userId) => dispatch(likePost(postId, userId)),
    unLikePost: (postId, userId) => dispatch(unLikePost(postId, userId)),
    editPost: (postId, value) => dispatch(editPost(postId, value)),
    editPostOff: (postId) => dispatch(editPostOff(postId)),
    postCommenstOn: (postId) => dispatch(postCommenstOn(postId)),
    postCommenstOff: (postId) => dispatch(postCommenstOff(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
