import todoListsActions from "./listsTypes";
import {
  createList,
  removeTodoList,
  toggleTodosHistory,
  restoreTodoList,
  DELETEtodoList,
  listChangedColor,
  editedListName,
} from "../../../services/todosService";
import { incTodolistsCount } from "../../../services/userService";

const addTodoListRequest = () => {
  return { type: todoListsActions.ADD_TODOLIST_REQUEST };
};

const addTodoListSuccess = (list) => {
  const { list_name, user_id, list_color, id } = list;
  return {
    type: todoListsActions.ADD_TODOLIST_SUCCESS,
    payload: { list_name, user_id, list_color, id },
  };
};

const addTodoListFailure = (error) => {
  return { type: todoListsActions.ADD_TODOLIST_FAILURE, payload: error };
};

export function addTodoList(list, listCount = 1) {
  return (dispatch) => {
    dispatch(addTodoListRequest());
    createList(list).then(() => {
      dispatch(addTodoListSuccess(list));
    }).catch = (err) => {
      console.error("add todolist rejected");
      dispatch(addTodoListFailure(err));
    };
  };
}

/**** lists cunter inc  ****/
const counterIncRequest = () => {
  return { type: todoListsActions.INC_LIST_COUNT_REQUEST };
};

const counterIncSuccess = (user) => {
  const newCount = user.todoLists_count + 1;
  return {
    type: todoListsActions.INC_LIST_COUNT_SUCCESS,
    payload: { user, newCount },
  };
};

const counterIncFailure = (error) => {
  return { type: todoListsActions.INC_LIST_COUNT_FAILURE, payload: error };
};

export function incListsCount(user) {
  return (dispatch) => {
    dispatch(counterIncRequest());
    incTodolistsCount(user.todoLists_count).then(() => {
      dispatch(counterIncSuccess(user));
    }).catch = (err) => {
      console.error("increce todo-lists count failed");
      dispatch(counterIncFailure(err));
    };
  };
}

/**** remove List  ****/
const removeListRequest = () => {
  return { type: todoListsActions.REMOVE_LIST_REQUEST };
};

const removeListSuccess = (list) => {
  return {
    type: todoListsActions.REMOVE_LIST_SUCCESS,
    payload: { list },
  };
};

const removeListFailure = (error) => {
  return { type: todoListsActions.REMOVE_LIST_FAILURE, payload: error };
};

export function removeList(list) {
  return (dispatch) => {
    dispatch(removeListRequest());
    removeTodoList(list).then(() => {
      dispatch(removeListSuccess(list));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(removeListFailure(err));
    };
  };
}

/**** restore List  ****/
const restoreListRequest = () => {
  return { type: todoListsActions.RESTORE_LIST_REQUEST };
};

const restoreListSuccess = (list) => {
  return {
    type: todoListsActions.RESTORE_LIST_SUCCESS,
    payload: { list },
  };
};

const restoreListFailure = (error) => {
  return { type: todoListsActions.RESTORE_LIST_FAILURE, payload: error };
};

export function restoreList(list) {
  return (dispatch) => {
    dispatch(restoreListRequest());
    restoreTodoList(list).then(() => {
      dispatch(restoreListSuccess(list));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(restoreListFailure(err));
    };
  };
}

/**** DELETE List  ****/
const DELETElistRequest = () => {
  return { type: todoListsActions.DELETE_LIST_REQUEST };
};

const DELETElistSuccess = (list) => {
  return {
    type: todoListsActions.DELETE_LIST_SUCCESS,
    payload: { list },
  };
};

const DELETElistFailure = (error) => {
  return { type: todoListsActions.DELETE_LIST_FAILURE, payload: error };
};

export function DELETElist(list) {
  return (dispatch) => {
    dispatch(DELETElistRequest());
    DELETEtodoList(list).then(() => {
      dispatch(DELETElistSuccess(list));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(DELETElistFailure(err));
    };
  };
}

/**** change list colors  ****/
const changeListColorRequest = () => {
  return { type: todoListsActions.CHANGE_LIST_COLOR_REQUEST };
};

const changeListColorSuccess = (list, color) => {
  return {
    type: todoListsActions.CHANGE_LIST_COLOR_SUCCESS,
    payload: { list, color },
  };
};
const changeListColorFailure = (error) => {
  return { type: todoListsActions.CHANGE_LIST_COLOR_FAILURE, payload: error };
};
export function listChangeColor(list, color) {
  return (dispatch) => {
    dispatch(changeListColorRequest());
    listChangedColor(list, color).then(() => {
      dispatch(changeListColorSuccess(list, color));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(changeListColorFailure(err));
    };
  };
}

/**** history btn toggle  ****/
const historyBtnToggleRequest = () => {
  return { type: todoListsActions.HISTORY_BTN_REQUEST };
};

const historyBtnToggleSuccess = (user) => {
  return {
    type: todoListsActions.HISTORY_BTN_SUCCESS,
    payload: user,
  };
};

const historyBtnToggleFailure = (error) => {
  return { type: todoListsActions.HISTORY_BTN_FAILURE, payload: error };
};

export function historyBtnToggler(user) {
  return (dispatch) => {
    dispatch(historyBtnToggleRequest());
    toggleTodosHistory().then(() => {
      dispatch(historyBtnToggleSuccess(user));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(historyBtnToggleFailure(err));
    };
  };
}

/* list name in edit */
const inEditListrequest = (listId) => {
  return { type: todoListsActions.IN_EDIT_LIST, payload: { listId } };
};

export function inEditList(listId) {
  return (dispatch) => {
    dispatch(inEditListrequest(listId));
  };
}

/*list name todo out edit */
const outEditListRequest = (listId) => {
  return { type: todoListsActions.OUT_EDIT_LIST, payload: { listId } };
};

export function outEditList(listId) {
  return (dispatch) => {
    dispatch(outEditListRequest(listId));
  };
}

/**** edit list name  ****/
const editListNameRequest = () => {
  return { type: todoListsActions.EDIT_LIST_NAME_REQUEST };
};

const editListNameSuccess = (listId, value) => {
  return {
    type: todoListsActions.EDIT_LIST_NAME_SUCCESS,
    payload: { listId, value },
  };
};

const editListNameFailure = (error) => {
  return { type: todoListsActions.EDIT_LIST_NAME_FAILURE, payload: error };
};

export function editListName(listId, value) {
  return (dispatch) => {
    dispatch(editListNameRequest());
    editedListName(listId, value).then(() => {
      dispatch(editListNameSuccess(listId, value));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(editListNameFailure(err));
    };
  };
}
