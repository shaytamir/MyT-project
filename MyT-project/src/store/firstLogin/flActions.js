import firstLoginActions from "./flTypes";
import { isFirstLogin } from "../../services/userService";

const FirstLoginRequest = () => {
  return { type: firstLoginActions.FIRST_LOGIN_REQUEST };
};

const FirstLoginSuccess = (user) => {
  return { type: firstLoginActions.FIRST_LOGIN_SUCCESS, payload: { user } };
};

const FirstLoginFailure = (error) => {
  return { type: firstLoginActions.FIRST_LOGIN_FAILURE, payload: error };
};

export function firstLogin(user) {
  return (dispatch) => {
    dispatch(FirstLoginRequest());
    isFirstLogin().then(() => {
      dispatch(FirstLoginSuccess(user));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(FirstLoginFailure(err));
    };
  };
}
