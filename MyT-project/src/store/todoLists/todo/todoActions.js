import todoActions from "./todoTypes";
import {
  createTodoo,
  incrementTodosCount,
  removedTodo,
  restoredTodo,
  DELETEDtodo,
  editTodoo,
  toggledIsChecked,
} from "../../../services/todosService";

/* add todo */
const addTodoRequest = () => {
  return { type: todoActions.ADD_TODO_REQUEST };
};

const addTodoSuccess = (todo, listId) => {
  return {
    type: todoActions.ADD_TODO_SUCCESS,
    payload: { todo, listId },
  };
};

const addTodoFailure = (error) => {
  return { type: todoActions.ADD_TODO_FAILURE, payload: error };
};

export function addTodo(todo, listId) {
  return (dispatch) => {
    dispatch(addTodoRequest());
    createTodoo(todo, listId).then(() => {
      dispatch(addTodoSuccess(todo, listId));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(addTodoFailure(err));
    };
  };
}

/* edit todo */
const editTodoRequest = () => {
  return { type: todoActions.EDIT_TODO_REQUEST };
};

const editTodoSuccess = (todo, listId, newText) => {
  return {
    type: todoActions.EDIT_TODO_SUCCESS,
    payload: { todo, listId, newText },
  };
};

const editTodoFailure = (error) => {
  return { type: todoActions.EDIT_TODO_FAILURE, payload: error };
};

export function editTodo(todo, listId, newText) {
  return (dispatch) => {
    dispatch(editTodoRequest());
    editTodoo(todo, listId, newText).then(() => {
      dispatch(editTodoSuccess(todo, listId, newText));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(editTodoFailure(err));
    };
  };
}

/* toggle todo isChecked */
const toggleIsCheckedRequest = () => {
  return { type: todoActions.TOGGLE_ISCHECKED_REQUEST };
};

const oggleIsCheckedSuccess = (listId, todo) => {
  return {
    type: todoActions.TOGGLE_ISCHECKED_SUCCESS,
    payload: { listId, todo },
  };
};

const oggleIsCheckedFailure = (error) => {
  return { type: todoActions.TOGGLE_ISCHECKED_FAILURE, payload: error };
};

export function toggleIsChecked(listId, todo) {
  return (dispatch) => {
    console.log(listId, todo);
    dispatch(toggleIsCheckedRequest());
    console.log(111);
    toggledIsChecked(listId, todo).then(() => {
      console.log(222);
      dispatch(oggleIsCheckedSuccess(listId, todo));
      console.log(333);
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(oggleIsCheckedFailure(err));
    };
  };
}

/**** Todos cunter inc  ****/
const incTodosRequest = () => {
  return { type: todoActions.INC_TODOS_COUNT_REQUEST };
};

const incTodosSuccess = (listId) => {
  return {
    type: todoActions.INC_TODOS_COUNT_SUCCESS,
    payload: { listId },
  };
};

const incTodosFailure = (error) => {
  return { type: todoActions.INC_TODOS_COUNT_FAILURE, payload: error };
};

export function incTodosCount(listId) {
  return (dispatch) => {
    dispatch(incTodosRequest());
    incrementTodosCount(listId).then(() => {
      dispatch(incTodosSuccess(listId));
    }).catch = (err) => {
      console.error("increce todo-lists count failed");
      dispatch(incTodosFailure(err));
    };
  };
}

/* remove todo */
const removeTodoRequest = () => {
  return { type: todoActions.REMOVE_TODO_REQUEST };
};
const removeTodoSuccess = (todo, listId) => {
  return {
    type: todoActions.REMOVE_TODO_SUCCESS,
    payload: { todo, listId },
  };
};
const removeTodoFailure = (error) => {
  return { type: todoActions.REMOVE_TODO_FAILURE, payload: error };
};
export function removeTodo(todo, listId) {
  return (dispatch) => {
    dispatch(removeTodoRequest());
    removedTodo(todo, listId).then(() => {
      dispatch(removeTodoSuccess(todo, listId));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(removeTodoFailure(err));
    };
  };
}

/* remove todo */
const restoreTodoRequest = () => {
  return { type: todoActions.RESTORE_TODO_REQUEST };
};
const restoreTodoSuccess = (todo, listId) => {
  return {
    type: todoActions.RESTORE_TODO_SUCCESS,
    payload: { todo, listId },
  };
};
const restoreTodoFailure = (error) => {
  return { type: todoActions.RESTORE_TODO_FAILURE, payload: error };
};

export function restoreTodo(todo, listId) {
  return (dispatch) => {
    dispatch(restoreTodoRequest());
    restoredTodo(todo, listId).then(() => {
      dispatch(restoreTodoSuccess(todo, listId));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(restoreTodoFailure(err));
    };
  };
}

/* DELETE todo */
const DeleteTodoRequest = () => {
  return { type: todoActions.DELETE_TODO_REQUEST };
};
const DeleteTodoSuccess = (todo, listId) => {
  return {
    type: todoActions.DELETE_TODO_SUCCESS,
    payload: { todo, listId },
  };
};
const DeleteTodoFailure = (error) => {
  return { type: todoActions.DELETE_TODO_FAILURE, payload: error };
};

export function DELETEtodo(todo, listId) {
  return (dispatch) => {
    dispatch(DeleteTodoRequest());
    DELETEDtodo(todo, listId).then(() => {
      dispatch(DeleteTodoSuccess(todo, listId));
    }).catch = (err) => {
      console.error("first login rejected");
      dispatch(DeleteTodoFailure(err));
    };
  };
}

/* todo in edit */
const inEditTodoquest = (todo, listId) => {
  return { type: todoActions.IN_EDIT_TODO, payload: { todo, listId } };
};

export function inEditTodo(todo, listId) {
  return (dispatch) => {
    dispatch(inEditTodoquest(todo, listId));
  };
}

/* todo out edit */
const outEditTodoquest = (todo, listId) => {
  return { type: todoActions.OUT_EDIT_TODO, payload: { todo, listId } };
};

export function outEditTodo(todo, listId) {
  return (dispatch) => {
    dispatch(outEditTodoquest(todo, listId));
  };
}
