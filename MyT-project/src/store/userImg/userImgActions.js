import userImgActions from "./userImgTypes";
import {
  setUserProfileImg,
  changedProfileImg,
  falsedProfileImg,
  addedImg,
  uploadedImg,
  DeletedImg,
  imgCounterIncrece,
} from "../../services/imgService";

/* toggle true once* when upload img */
const uploadImgRequest = () => {
  return { type: userImgActions.USER_UPLOAD_IMG_REQUEST };
};

const uploadImgSuccess = (user) => {
  return {
    type: userImgActions.USER_UPLOAD_IMG_SUCCESS,
    payload: { user },
  };
};

const uploadImgFailure = (error) => {
  return { type: userImgActions.USER_UPLOAD_IMG_FAILURE, payload: error };
};

export function uploadUserImg(user) {
  return (dispatch) => {
    dispatch(uploadImgRequest());
    uploadedImg().then(() => {
      dispatch(uploadImgSuccess(user));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(uploadImgFailure(err));
    };
  };
}

/* add img */
const addImgRequest = () => {
  return { type: userImgActions.ADD_IMG_REQUEST };
};

const addImgSuccess = (urlImg, userId, imgCount) => {
  return {
    type: userImgActions.ADD_IMG_SUCCESS,
    payload: { urlImg, userId, imgCount },
  };
};

const addImgFailure = (error) => {
  return { type: userImgActions.ADD_IMG_FAILURE, payload: error };
};

export function addImg(img, urlImg, userId, imgCount) {
  return (dispatch) => {
    dispatch(addImgRequest());
    addedImg(img).then(() => {
      dispatch(addImgSuccess(urlImg, userId, imgCount));
    }).catch = (err) => {
      console.error("new img rejected");
      dispatch(addImgFailure(err));
    };
  };
}

/**** img cunter increce  ****/
const counterIncRequest = () => {
  return { type: userImgActions.IMG_COUNTER_INC_REQUEST };
};

const counterIncSuccess = (user) => {
  console.log(23333333);
  const newCount = user.todoLists_count + 1;
  return {
    type: userImgActions.IMG_COUNTER_INC_SUCCESS,
    payload: { user, newCount },
  };
};

const counterIncFailure = (error) => {
  return { type: userImgActions.IMG_COUNTER_INCT_FAILURE, payload: error };
};

export function imgCounterInc(user) {
  return (dispatch) => {
    dispatch(counterIncRequest());
    imgCounterIncrece().then(() => {
      dispatch(counterIncSuccess(user));
    }).catch = (err) => {
      console.error("increce todo-lists count failed");
      dispatch(counterIncFailure(err));
    };
  };
}

/* change profile img */
const changeProfileImgRequest = () => {
  return { type: userImgActions.PROFILE_IMG_REQUEST };
};

const changeProfileImgSuccess = (imgId, userId) => {
  return {
    type: userImgActions.PROFILE_IMG_SUCCESS,
    payload: { imgId, userId },
  };
};

const changeProfileImgFailure = (error) => {
  return { type: userImgActions.PROFILE_IMG_FAILURE, payload: error };
};

export function changeProfileImg(imgId, userId) {
  return (dispatch) => {
    dispatch(changeProfileImgRequest());
    falsedProfileImg().then(() => {
      changedProfileImg(imgId).then(() => {
        setUserProfileImg(imgId).then(() => {
          dispatch(changeProfileImgSuccess(imgId, userId));
        }).catch = (err) => {
          console.error("new img rejected");
          dispatch(changeProfileImgFailure(err));
        };
      });
    });
  };
}

/* img in edit mode */
const inimgEditMOderequest = (imgId) => {
  return { type: userImgActions.IN_IMG_EDIT_MODE, payload: { imgId } };
};

export function inimgEditMOde(imgId) {
  return (dispatch) => {
    dispatch(inimgEditMOderequest(imgId));
  };
}

/* img out edit mode */
const outimgEditMOderequest = (imgId) => {
  return { type: userImgActions.OUT_IMG_EDIT_MODE, payload: { imgId } };
};

export function outimgEditMOde(imgId) {
  return (dispatch) => {
    dispatch(outimgEditMOderequest(imgId));
  };
}

/* DELETE img */
const DELeteImgRequest = () => {
  return { type: userImgActions.DELETE_IMG_REQUEST };
};

const DELeteImgSuccess = (imgId) => {
  return {
    type: userImgActions.DELETE_IMG_SUCCESS,
    payload: { imgId },
  };
};

const DELeteImgFailure = (error) => {
  return { type: userImgActions.DELETE_IMG_FAILURE, payload: error };
};

export function DELeteImg(imgId) {
  return (dispatch) => {
    dispatch(DELeteImgRequest());
    DeletedImg(imgId).then(() => {
      dispatch(DELeteImgSuccess(imgId));
    }).catch = (err) => {
      console.error("new img rejected");
      dispatch(DELeteImgFailure(err));
    };
  };
}
