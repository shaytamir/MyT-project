import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from "./postsTypes";
import { getAllPosts } from "../../services/postService";
import { getAllUsers } from "../../services/userService";

const fetchPostsRequest = () => {
  return { type: FETCH_POSTS_REQUEST };
};

const fetchPostsSuccess = (posts, users) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: { posts, users },
  };
};
const fetchPostsFailure = (error) => {
  return { type: FETCH_POSTS_FAILURE, payload: error };
};

export const fetchPosts = (dispatch) => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    getAllPosts()
      .then((response) => {
        const posts = response.data.map((post) => post);
        getAllUsers().then((resp) => {
          const users = resp.data.map((user) => user);
          dispatch(fetchPostsSuccess(posts, users));
        });
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error));
      });
  };
};
const actions = {
  fetchPosts,
};
export default actions;
