import actions from "./initTypes";

import { getAllUsers, getUser } from "../../services/userService";

import { getAllPosts } from "../../services/postService";
import { getMyTodos } from "../../services/todosService";
import { getImgs } from "../../services/imgService";

const fetchDataRequest = () => {
  return { type: actions.FETCH_DATA_REQUEST };
};

const fetchDataSuccess = (posts, users, user, userTodos, imgs) => {
  return {
    type: actions.FETCH_DATA_SUCCESS,
    payload: { users, posts, user, userTodos, imgs },
  };
};

const fetchDataFailure = (error) => {
  return { type: actions.FETCH_DATA_FAILURE, payload: error };
};
export const fetchData = (dispatch) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    getAllPosts()
      .then((response) => {
        const posts = response.data.map((post) => post);
        getAllUsers().then((response) => {
          const users = response.data.map((user) => user);
          getUser().then((response) => {
            const user = response.data;
            getMyTodos().then((response) => {
              const userTodos = response.data;
              getImgs().then((response) => {
                const imgs = response.data;
                dispatch(fetchDataSuccess(posts, users, user, userTodos, imgs));
              });
            });
          }).catch = (err) => {
            console.error("user not fetched", err);
          };
        }).catch = (err) => {
          console.error("UserS not feteched", err);
        };
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error));
      });
  };
};
