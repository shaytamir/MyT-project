import likePostActions from "./likeTypes";
import { likedPost, unLikedPost } from "../../services/postService";

/* like post */

const likePostRequest = () => {
  return { type: likePostActions.LIKE_POST_REQUEST };
};

const likePostSuccess = (postId, userId) => {
  return {
    type: likePostActions.LIKE_POST_SUCCESS,
    payload: { postId, userId },
  };
};

const likePostFailure = (error) => {
  return { type: likePostActions.LIKE_POST_FAILURE, payload: error };
};

export function likePost(postId, userId) {
  return (dispatch) => {
    dispatch(likePostRequest());
    likedPost(postId).then(() => {
      dispatch(likePostSuccess(postId, userId));
    }).catch = (err) => {
      console.error("like rejected");
      dispatch(likePostFailure(err));
    };
  };
}

/* un-like post */

const unLikePostRequest = () => {
  return { type: likePostActions.UNLIKE_POST_REQUEST };
};

const unLikePostSuccess = (postId, userId) => {
  return {
    type: likePostActions.UNLIKE_POST_SUCCESS,
    payload: { postId, userId },
  };
};

const unLikePostFailure = (error) => {
  return { type: likePostActions.UNLIKE_POST_FAILURE, payload: error };
};

export function unLikePost(postId, userId) {
  return (dispatch) => {
    dispatch(unLikePostRequest());
    unLikedPost(postId).then(() => {
      dispatch(unLikePostSuccess(postId, userId));
    }).catch = (err) => {
      console.error("unLike rejected");
      dispatch(unLikePostFailure(err));
    };
  };
}
