import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import Joi from "joi-browser";

const token = "token";

/* user create account */
export function createAccount(data) {
  console.log(333);
  http.post(`${apiUrl}/users`, data);
}
/* get user token */
export function getJwt() {
  return localStorage.getItem("token");
}

/* login and local-storage set token */
export async function login(email, password) {
  try {
    const { data } = await http.post(`${apiUrl}/login`, { email, password });
    localStorage.setItem(token, data.token);
    return data;
  } catch (err) {
    console.log("err", err);
    return err;
  }
}
export function logout() {
  localStorage.removeItem(token);
}

/* get current user datails decoded */
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (err) {
    console.log("cant get current user", err);
    return null;
  }
}
/* get me */
export function getUser() {
  return http.get(`${apiUrl}/users/me`);
}
/* DELETE user */
export function DeletedUser() {
  return http.delete(`${apiUrl}/users/me/delete`);
}
/* get alll users */
export function getAllUsers() {
  return http.get(`${apiUrl}/users/get-all-users`);
}
/* edit user */
export async function editUserService(data) {
  return await http.patch(`${apiUrl}/users/me`, data);
}
/* checks if first login and gives firest todo list */
export async function isFirstLogin() {
  return await http.patch(`${apiUrl}/users/me/logs`);
}
/* counter for user's todoLists */
export async function incTodolistsCount(count) {
  console.log(count);
  const newCount = count + 1;
  console.log(newCount);
  return await http.patch(`${apiUrl}/users/me/todolists-count`, { newCount });
}

/* counter for user's posts */
export function incPostsCount() {
  return http.patch(`${apiUrl}/users/me/posts-count`);
}

/* user validation schema */
export const schema = {
  first_name: Joi.string().min(2).max(255).required().label("First Name"),
  last_name: Joi.string().min(2).max(255).required().label("Last Name"),
  email: Joi.string().min(6).max(255).required().email().label("Email"),
  // gender: Joi.string().min(4).max(6),
  cell: Joi.string()
    .min(9)
    .max(10)
    .regex(/^0[2-9]\d{7,8}$/)
    .label("Cell"),
  password: Joi.string().min(6).max(1024).required().label("Password"),
  password_confirm: Joi.string()
    .required()
    .min(6)
    .max(1024)

    .label("Password Confirm")
    .valid(Joi.ref("password"))
    .options({
      language: {
        any: {
          allowOnly: "!! ",
        },
      },
    }),
};

const userService = {
  login,
  getCurrentUser,
  logout,
  getJwt,
};

export default userService;
