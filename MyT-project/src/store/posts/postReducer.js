import {
  ADD_POST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from "./postsTypes";

const initialState = {
  posts: [],
  users: [],
  loading: false,
  error: "",
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let posts = [
        ...state.posts,
        { post: action.payload.post, user_id: action.payload.user_id },
      ];
      return {
        ...state,
        posts,
      };
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        users: action.payload.users,
        error: "",
      };

    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.error,
      };

    default:
      return state;
  }
};

export default postsReducer;
