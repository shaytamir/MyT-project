import http from "./httpService";
import { apiUrl } from "../config.json";

/* create post */
export async function createPost(post) {
  return http.post(`${apiUrl}/posts`, { post });
}
/* get all posts */
export function getAllPosts() {
  return http.get(`${apiUrl}/posts/get-all-posts`);
}

/* edit post */
export function EditedPost(postId, value) {
  return http.patch(`${apiUrl}/posts/edit-post/${postId}`, { value });
}

/* like a post */
export function likedPost(postId) {
  return http.patch(`${apiUrl}/posts/liked/${postId}`);
}
/* unlike a post */
export function unLikedPost(postId) {
  return http.patch(`${apiUrl}/posts/un-liked/${postId}`);
}
/* add comment to post */
export function addedComment(postId, comment) {
  return http.patch(`${apiUrl}/posts/add-comment/${postId}`, { comment });
}

/* edit comment to post */
export function editedComment(postId, comment, newValue) {
  return http.patch(`${apiUrl}/posts/edit-comment/${postId}`, {
    comment,
    newValue,
  });
}
/* delete comment */
export function deletedComment(postId, comment) {
  console.log(postId);
  return http.patch(`${apiUrl}/posts/delete-comment/${postId}`, {
    comment,
  });
}
/* DELETE post */
export function DELETEpost(postId) {
  console.log(postId);
  return http.delete(`${apiUrl}/posts/${postId}`);
}

const postServie = {
  createPost,
  getAllPosts,
};

export default postServie;
