import commentPostTypes from "./commentsTypes";
import {
  addedComment,
  editedComment,
  deletedComment,
} from "../../../services/postService";

/* post comments on */
const postCommentsOnSuccess = (postId) => {
  return {
    type: commentPostTypes.COMMENTS_POST_ON,
    payload: { postId },
  };
};

export function postCommenstOn(postId) {
  console.log(321);
  return (dispatch) => {
    dispatch(postCommentsOnSuccess(postId));
  };
}

/*  post comments  off */
const postCommentsOffSuccess = (postId) => {
  console.log(123);
  return {
    type: commentPostTypes.COMMENTS_POST_OFF,
    payload: { postId },
  };
};

export function postCommenstOff(postId) {
  return (dispatch) => {
    console.log(postId);
    dispatch(postCommentsOffSuccess(postId));
  };
}

/* add comment */
const addCommentRequest = () => {
  return { type: commentPostTypes.ADD_COMMENT_REQUEST };
};

const addCommentSuccess = (postId, comment) => {
  return {
    type: commentPostTypes.ADD_COMMENT_SUCCESS,
    payload: { postId, comment },
  };
};

const addCommentFailure = (error) => {
  return { type: commentPostTypes.ADD_COMMENT_FAILURE, payload: error };
};

export function addComment(postId, comment) {
  return (dispatch) => {
    dispatch(addCommentRequest());
    console.log(111);
    addedComment(postId, comment).then(() => {
      console.log(222);
      dispatch(addCommentSuccess(postId, comment));
      console.log(333);
    }).catch = (err) => {
      console.error("unLike rejected");
      dispatch(addCommentFailure(err));
    };
  };
}

/* edit  comment */
const editCommentRequest = () => {
  return { type: commentPostTypes.EDIT_COMMENT_REQUEST };
};
const editCommentSuccess = (postId, comment, newValue) => {
  return {
    type: commentPostTypes.EDIT_COMMENT_SUCCESS,
    payload: { postId, comment, newValue },
  };
};
const editCommentFailure = (error) => {
  return { type: commentPostTypes.EDIT_COMMENT_FAILURE, payload: error };
};
export function editComment(postId, comment, newValue) {
  return (dispatch) => {
    dispatch(editCommentRequest());
    console.log(111);
    editedComment(postId, comment, newValue).then(() => {
      console.log(222);
      dispatch(editCommentSuccess(postId, comment, newValue));
      console.log(333);
    }).catch = (err) => {
      console.error("unLike rejected");
      dispatch(editCommentFailure(err));
    };
  };
}

/* delete  comment */
const deleteCommentRequest = () => {
  return { type: commentPostTypes.DELETE_COMMENT_REQUEST };
};

const deleteCommentSuccess = (postId, comment) => {
  return {
    type: commentPostTypes.DELETE_COMMENT_SUCCESS,
    payload: { postId, comment },
  };
};

const deleteCommentFailure = (error) => {
  return { type: commentPostTypes.DELETE_COMMENT_FAILURE, payload: error };
};

export function deleteComment(postId, comment) {
  return (dispatch) => {
    dispatch(deleteCommentRequest());
    console.log(111);
    deletedComment(postId, comment).then(() => {
      console.log(222);
      dispatch(deleteCommentSuccess(postId, comment));
      console.log(333);
    }).catch = (err) => {
      console.error("unLike rejected");
      dispatch(deleteCommentFailure(err));
    };
  };
}

/* comment in edit mode */
const inCommentEditRequest = (postId, commentId) => {
  return {
    type: commentPostTypes.COMMENTS_IN_EDIT,
    payload: { postId, commentId },
  };
};

export function inEditComment(postId, commentId) {
  return (dispatch) => {
    dispatch(inCommentEditRequest(postId, commentId));
  };
}

/* comment out edit mode */
const outCommentEditRequest = (postId, commentId) => {
  console.log(222);
  return {
    type: commentPostTypes.COMMENTS_OUT_EDIT,
    payload: { postId, commentId },
  };
};

export function outEditComment(postId, commentId) {
  console.log(111);
  return (dispatch) => {
    dispatch(outCommentEditRequest(postId, commentId));
  };
}
