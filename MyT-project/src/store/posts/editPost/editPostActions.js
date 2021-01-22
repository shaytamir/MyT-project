import editPostActions from "./editPostTypes";
import { EditedPost, DELETEpost } from "../../../services/postService";

/* edit post */
const editPostRequest = () => {
  return { type: editPostActions.EDIT_POST_REQUEST };
};

const editPostSuccess = (postId, value) => {
  console.log(value);
  return {
    type: editPostActions.EDIT_POST_SUCCESS,
    payload: { postId, value },
  };
};

const editPostFailure = (error) => {
  return { type: editPostActions.EDIT_POST_FAILURE, payload: error };
};

export function editPost(postId, value) {
  return (dispatch) => {
    dispatch(editPostRequest());
    console.log(111);
    EditedPost(postId, value).then(() => {
      console.log(222);
      dispatch(editPostSuccess(postId, value));
      console.log(333);
    }).catch = (err) => {
      console.error("unLike rejected");
      dispatch(editPostFailure(err));
    };
  };
}

/* edit post on */

const editOnSuccess = (postId) => {
  return {
    type: editPostActions.EDIT_ON,
    payload: { postId },
  };
};

export function editPostOn(postId) {
  return (dispatch) => {
    dispatch(editOnSuccess(postId));
  };
}
/* edit post off */

const editOffSuccess = (postId) => {
  return {
    type: editPostActions.EDIT_OFF,
    payload: { postId },
  };
};

export function editPostOff(postId) {
  return (dispatch) => {
    console.log(postId);
    dispatch(editOffSuccess(postId));
  };
}

/* delete post */
const deletePostRequest = () => {
  return { type: editPostActions.DELETE_POST_REQUEST };
};

const deletePostSuccess = (postId) => {
  return {
    type: editPostActions.DELETE_POST_SUCCESS,
    payload: { postId },
  };
};

const deletePostFailure = (error) => {
  return { type: editPostActions.DELETE_POST_FAILURE, payload: error };
};

export function deletePost(postId) {
  return (dispatch) => {
    dispatch(deletePostRequest());
    console.log(111);
    DELETEpost(postId).then(() => {
      console.log(222);
      dispatch(deletePostSuccess(postId));
      console.log(333);
    }).catch = (err) => {
      console.error("unLike rejected");
      dispatch(deletePostFailure(err));
    };
  };
}
