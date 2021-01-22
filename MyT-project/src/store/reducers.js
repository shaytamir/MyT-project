import { combineReducers } from "redux";

import postReducer from "./posts/postReducer";
// import userReducer from "./user/userReducer";
import dataReducer from "./initialData/initReducers";

const rootReducer = combineReducers({
  posts: postReducer,
  // user: userReducer,
  data: dataReducer,
});

export default rootReducer;
