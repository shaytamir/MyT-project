import http from "./httpService";
import { apiUrl } from "../config.json";

export function getImgs() {
  return http.get(`${apiUrl}/image/get-images`);
}

/* toggle true once* when upload img */
export async function uploadedImg() {
  return await http.patch(`${apiUrl}/users/me/upload-img`);
}
/* add img */
export async function addedImg(imageFormObj) {
  return http.post(`${apiUrl}/image/uploadmulter`, imageFormObj);
}
/* make prev img -false profile img */
export function falsedProfileImg() {
  return http.patch(`${apiUrl}/image/false-current-profile-img`);
}
/* set new profile img ,in imgs colaction */
export function changedProfileImg(imgId) {
  return http.patch(`${apiUrl}/image/change-profile-img/${imgId}`);
}
/* set user profile img -to user collaction */
export function setUserProfileImg(imgId) {
  return http.patch(`${apiUrl}/image/set-user-profile-img/${imgId}`);
}
/* counter for users imgs(all + deleted) */
export function imgCounterIncrece() {
  return http.patch(`${apiUrl}/image/img-counter-inc`);
}
/* DELETE img */
export function DeletedImg(imgId) {
  return http.delete(`${apiUrl}/image/delete/${imgId}`);
}

const exports = {
  getImgs,
  uploadedImg,
  addedImg,
  falsedProfileImg,
  changedProfileImg,
  setUserProfileImg,
  DeletedImg,
};
export default exports;
