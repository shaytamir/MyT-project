import { createPost } from "../../../services/postService";

export const ADD_POSTS_REQUEST = "ADD_POSTS_REQUEST";
export const ADD_POSTS_SUCCESS = "ADD_POSTS_SUCCESS";
export const ADD_POSTS_FAILURE = "ADD_POSTS_FAILURE";

/* add post */

const addPostRequest = () => {
  return { type: ADD_POSTS_REQUEST };
};

const addPostSuccess = (post, user) => {
  return { type: ADD_POSTS_SUCCESS, payload: { post, user } };
};

const addPostFailure = (error) => {
  return { type: ADD_POSTS_FAILURE, payload: error };
};

export function AddPost(post, user) {
  return (dispatch) => {
    dispatch(addPostRequest());
    createPost(post, user).then(() => {
      dispatch(addPostSuccess(post, user));
    }).catch = (err) => {
      console.error("post rejected");
      dispatch(addPostFailure(err));
    };
  };
}

const actions = {
  ADD_POSTS_REQUEST,
  ADD_POSTS_SUCCESS,
  ADD_POSTS_FAILURE,
};

export default actions;
