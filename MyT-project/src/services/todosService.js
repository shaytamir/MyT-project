import http from "./httpService";
import { apiUrl } from "../config.json";

/* create a singel todo */
export async function createTodoo(todo, listId) {
  return http.patch(`${apiUrl}/todolist/todos/add-todo/${listId}`, todo);
}
/* edit a singel todo */
export async function editTodoo(todo, listId, newText) {
  return http.patch(`${apiUrl}/todolist/todos/edit-todo/${listId}`, {
    todo,
    newText,
  });
}
/* toggle todo check-box */
export async function toggledIsChecked(listId, todo) {
  return http.patch(`${apiUrl}/todolist/todos/is-checked/${listId}`, {
    todo,
  });
}
/* create todoList */
export async function createList(list) {
  return http.post(`${apiUrl}/todolist/lists`, list);
}
/* change list color */
export async function listChangedColor(list, color) {
  return http.patch(`${apiUrl}/todolist/lists/change-color/${list.id}`, {
    color,
  });
}
/* get my lists */
export function getMyTodos() {
  return http.get(`${apiUrl}/todolist/lists`);
}
/* handles not deleted todos count */
export async function myActiveTodosCount() {
  const myTodos = await getMyTodos();
  console.log(myTodos);

  const myActiveTodosCount = myTodos.data.filter((todo) => {
    return !todo.isDeleted;
  });
  console.log(myActiveTodosCount.length);
  return myActiveTodosCount.length;
}
/* handles users list count */
export async function incrementTodosCount(listId) {
  return await http.patch(`${apiUrl}/todolist/lists/todos-count/${listId}`);
}
export async function toggleTodosHistory() {
  // return await http.patch(`${apiUrl}/users/me/todos-history`);
  return true;
}

/* edit list name */
export function editedListName(listId, value) {
  return http.patch(`${apiUrl}/todolist/lists/edit-list-name/${listId}`, {
    value,
  });
}
/* remove(not delete) todolist */
export function removeTodoList(list) {
  return http.patch(`${apiUrl}/todolist/lists/remove/${list.id}`);
}
/* Restore removed todolist */
export function restoreTodoList(list) {
  return http.patch(`${apiUrl}/todolist/lists/restore/${list.id}`);
}
/* DELETE todolist */
export function DELETEtodoList(list) {
  return http.delete(`${apiUrl}/todolist/lists/delete/${list.id}`);
}
/* remove(not delete) todo */
export function removedTodo(todo, listId) {
  return http.patch(`${apiUrl}/todoList/todos/remove/${listId}`, todo);
}
/* Restore removed todo */
export function restoredTodo(todo, listId) {
  return http.patch(`${apiUrl}/todoList/todos/restore/${listId}`, todo);
}
/* DELETE todo */
export function DELETEDtodo(todo, listId) {
  return http.patch(`${apiUrl}/todoList/todos/delete/${listId}`, todo);
}

const todosService = {
  createList,
};

export default todosService;
