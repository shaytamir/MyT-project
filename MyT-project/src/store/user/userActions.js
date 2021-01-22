import userActions from "./userTypes";
import { DeletedUser } from "../../services/userService";

const DeleteUserRequest = () => {
  return { type: userActions.DELETE_USER_REQUEST };
};

const DeleteUserSuccess = (userId) => {
  return {
    type: userActions.DELETE_USER_SUCCESS,
    payload: { userId },
  };
};

const DeleteUserFailure = (error) => {
  return { type: userActions.DELETE_USER_FAILURE, payload: error };
};

export function DeleteUser(userId) {
  return (dispatch) => {
    dispatch(DeleteUserRequest());
    DeletedUser().then(() => {
      dispatch(DeleteUserSuccess(userId));
    }).catch = (err) => {
      console.error("increce todo-lists count failed");
      dispatch(DeleteUserFailure(err));
    };
  };
}
