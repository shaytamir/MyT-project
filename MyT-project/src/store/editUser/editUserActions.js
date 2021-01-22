import UserActions from "./editUserTypes";
import { editUserService } from "../../services/userService";

const editUserRequest = () => {
  return { type: UserActions.EDIT_USER_REQUEST };
};

const editUserSuccess = (user, userId) => {
  console.log(user);
  return { type: UserActions.EDIT_USER_SUCCESS, payload: { user, userId } };
};

const editUserFailure = (error) => {
  return { type: UserActions.EDIT_USER_FAILURE, payload: error };
};

export function editUser(user, userId) {
  console.log(user);
  return (dispatch) => {
    dispatch(editUserRequest());
    editUserService(user).then(() => {
      dispatch(editUserSuccess(user, userId));
    }).catch = (err) => {
      console.error("user edit rejected");
      dispatch(editUserFailure(err));
    };
  };
}
